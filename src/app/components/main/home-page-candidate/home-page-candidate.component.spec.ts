import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageCandidateComponent } from './home-page-candidate.component';

describe('HomePageCandidateComponent', () => {
  let component: HomePageCandidateComponent;
  let fixture: ComponentFixture<HomePageCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageCandidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePageCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
