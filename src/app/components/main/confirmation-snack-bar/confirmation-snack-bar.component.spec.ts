import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationSnackBarComponent } from './confirmation-snack-bar.component';

describe('ConfirmationSnackBarComponent', () => {
  let component: ConfirmationSnackBarComponent;
  let fixture: ComponentFixture<ConfirmationSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationSnackBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
