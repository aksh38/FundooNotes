import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetVerifyComponent } from './forget-verify.component';

describe('ForgetVerifyComponent', () => {
  let component: ForgetVerifyComponent;
  let fixture: ComponentFixture<ForgetVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
