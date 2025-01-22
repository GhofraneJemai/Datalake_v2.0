import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateJobPostsComponent } from './candidate-job-posts.component';

describe('CandidateJobPostsComponent', () => {
  let component: CandidateJobPostsComponent;
  let fixture: ComponentFixture<CandidateJobPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateJobPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidateJobPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
