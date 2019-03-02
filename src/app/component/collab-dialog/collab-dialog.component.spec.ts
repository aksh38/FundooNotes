import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabDialogComponent } from './collab-dialog.component';

describe('CollabDialogComponent', () => {
  let component: CollabDialogComponent;
  let fixture: ComponentFixture<CollabDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollabDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
