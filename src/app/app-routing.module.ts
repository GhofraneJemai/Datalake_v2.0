import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/main/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ServiceComponent } from './components/service/service.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
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
