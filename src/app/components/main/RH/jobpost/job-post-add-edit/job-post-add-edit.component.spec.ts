import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostAddEditComponent } from './job-post-add-edit.component';

describe('JobPostAddEditComponent', () => {
  let component: JobPostAddEditComponent;
  let fixture: ComponentFixture<JobPostAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobPostAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobPostAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
