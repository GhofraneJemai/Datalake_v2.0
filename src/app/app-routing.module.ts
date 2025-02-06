import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/main/RH/employe/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ServiceComponent } from './components/service/service.component';
import { JobPostComponent } from './components/main/RH/jobpost/job-post/job-post.component';
import { CandidateJobPostsComponent } from './components/main/candidat/candidate-job-posts/candidate-job-posts.component';
import { JobDetailsComponent } from './components/main/candidat/job-details/job-details.component';
import { MyApplicationsComponent } from './components/main/candidat/my-applications/my-applications.component';
import { JobApplicationsComponent } from './components/main/RH/job-applications/job-applications.component';
import { RoleGuard } from './guards/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomePageCandidateComponent } from './components/main/home-page-candidate/home-page-candidate.component';
import { HomePageAdminComponent } from './components/main/home-page-admin/home-page-admin.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RoleGuard],data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'jobpost',
    component: JobPostComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'candidat-jobpost',
    component: CandidateJobPostsComponent,
    canActivate: [RoleGuard],data: { expectedRole: 'CANDIDATE' }
  },
  {
    path: 'candidat-applications',
    component: MyApplicationsComponent,
    canActivate: [RoleGuard],data: { expectedRole: 'CANDIDATE' }
  },
  {
    path: 'job-applications',
    component: JobApplicationsComponent,
    canActivate: [RoleGuard],data: { expectedRole: 'ADMIN' }
  },
  { path: 'job-details/:id', component: JobDetailsComponent
  
  },
  {
    path: 'index', component: IndexComponent
  },
  {
    path: 'home-candidat', component: HomePageCandidateComponent,canActivate: [RoleGuard],data: { expectedRole: 'CANDIDATE' }
  },
  {
    path: 'home-admin', component: HomePageAdminComponent,canActivate: [RoleGuard],data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'service', component: ServiceComponent
  },
  {
    path: 'about-us', component: AboutUsComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'forbidden', component: ForbiddenComponent
  },
  {
    path: '',
    redirectTo: 'index', // Default redirect to 'index'
    pathMatch: 'full'
  },
  {
    path: '**',
    canActivate: [RoleGuard], // Use the RoleGuard to handle logout for unknown routes
    data: { expectedRole: 'LOGOUT' },
    // Empty component just to handle the route
    component: IndexComponent // You can render the index page after logout
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
