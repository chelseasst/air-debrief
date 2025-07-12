import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Summary } from './summary';
import { Transcript } from '../transcript';

describe('Summary', () => {
  let component: Summary;
  let fixture: ComponentFixture<Summary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Summary],
      providers: [
        provideRouter([]),
        Transcript
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Summary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
