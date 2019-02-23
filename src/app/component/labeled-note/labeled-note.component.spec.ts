import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledNoteComponent } from './labeled-note.component';

describe('LabeledNoteComponent', () => {
  let component: LabeledNoteComponent;
  let fixture: ComponentFixture<LabeledNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabeledNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeledNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
