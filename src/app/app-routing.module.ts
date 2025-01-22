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

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'jobpost',
    component: JobPostComponent
  },
  {
    path: 'candidat-jobpost',
    component: CandidateJobPostsComponent
  },
  {
    path: 'job-details',
    component: JobDetailsComponent
  },
  {
    path:'', redirectTo:'index',pathMatch:'full'
  },
  {
    path: 'index', component: IndexComponent
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
