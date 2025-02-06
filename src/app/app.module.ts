import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/main/RH/employe/home/home.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { IndexComponent } from './components/index/index.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { EmpAddEditComponent } from './components/main/RH/employe/emp-add-edit/emp-add-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


import {FormsModule} from '@angular/forms';
import { ServiceComponent } from './components/service/service.component';
import { JobPostComponent } from './components/main/RH/jobpost/job-post/job-post.component';
import { JobPostAddEditComponent } from './components/main/RH/jobpost/job-post-add-edit/job-post-add-edit.component';
import { CandidateJobPostsComponent } from './components/main/candidat/candidate-job-posts/candidate-job-posts.component';
import { JobDetailsComponent } from './components/main/candidat/job-details/job-details.component';
import { MyApplicationsComponent } from './components/main/candidat/my-applications/my-applications.component';
import { JobApplicationsComponent } from './components/main/RH/job-applications/job-applications.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomePageCandidateComponent } from './components/main/home-page-candidate/home-page-candidate.component';
import { HomePageAdminComponent } from './components/main/home-page-admin/home-page-admin.component';
import { ConfirmationSnackBarComponent } from './components/main/confirmation-snack-bar/confirmation-snack-bar.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AboutUsComponent,
    IndexComponent,
    EmpAddEditComponent,
    ServiceComponent,
    JobPostComponent,
    JobPostAddEditComponent,
    CandidateJobPostsComponent,
    JobDetailsComponent,
    MyApplicationsComponent,
    JobApplicationsComponent,
    ForbiddenComponent,
    HomePageCandidateComponent,
    HomePageAdminComponent,
    ConfirmationSnackBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatSliderModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }