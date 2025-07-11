import { effect, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class Transrcipt {
  final = signal<{ wins: string[]; mistakes: string[]; summary: string; error: string | null }>({
    wins: [],
    mistakes: [],
    summary: '',
    error: null
  });
  listening = signal(false);
  loading = signal(false);
  hasSummary = signal(false);
  takeoff = signal(false);

  recognition: SpeechRecognition | null = null;
  transcript = signal('');

  constructor(private router: Router) {
    effect(() => {
      if (this.loading()) {
        this.router.navigate(['/loading']);
      } else if (this.hasSummary()) {
        this.takeoff.set(true);
        setTimeout(() => {
          this.router.navigate(['/summary']);
        }, 2000)
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  async analyze(transcript: string) {
    if (!transcript) {
      console.warn('Transcript was empty — skipping AI request');
      return;
    }
    try {
      const response = await fetch(`${environment.apiUrl}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: transcript })
      });

      const result = await response.json();

      this.hasSummary.set(true);
      this.final.set(result.analysis); //{wins, mistakes, summary}
    } catch (error) {
      this.hasSummary.set(true);
      this.final.set({
        wins: [],
        mistakes: [],
        summary: '',
        error: 'Server error. Please try again.'
      });
    } finally {
      this.loading.set(false);
    }
  }
  listen() {
    this.listening.set(true);
    this.hasSummary.set(false);

    //checks which api is available 
    //at runtime those are real existing functions built in the browser
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    //creates a new speech recognizer
    const recognizer = new SpeechRecognition();
    //sets language to recognize (you can change this).
    recognizer.lang = 'en-US';
    //keeps listening until manually stopped.
    recognizer.continuous = true;
    //enables live partial transcription.
    recognizer.interimResults = true;


    recognizer.onresult = (event: SpeechRecognitionEvent) => {
      let finalText = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript + ' ';
        }
      }
      if (finalText) {
        this.transcript.update((prev) => prev + finalText);
      }
    };
    //if anything goes wrong
    recognizer.onerror = (event) => {
      console.error('Speech recognition error:', event);
      this.listening.set(false);
    };
    //if the user stops speaking
    recognizer.onend = () => {
      this.listening.set(false);
    };
    //starts listening
    recognizer.start();
    //stores the recognizer, so we have refference to it and 
    // we can stop it 
    this.recognition = recognizer;
  }
  stop() {
    setTimeout(() => {
      if (this.recognition) {
        this.loading.set(true);
        this.recognition.stop();

        const transcript = this.transcript().trim();
        if (transcript) {
          this.analyze(transcript)
        } else {
          this.hasSummary.set(true);
          this.loading.set(false);
          this.final.set({ wins: [], mistakes: [], summary: '', error: 'Transcript Missing' })
          setTimeout(() => {
            this.hasSummary.set(false);
          }, 5000)
        }
      } else {
        this.loading.set(false);
        this.hasSummary.set(true);
        setTimeout(() => {
          this.hasSummary.set(false);
        }, 4000)
      }
    }, 3000)
  }
}
