import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FeedComponent } from './feed/feed.component';
import { ProjectComponent } from './project/project.component';
import { ProfileComponent } from './profile/profile.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent, DialogContentNewProjDialog } from './dashboard/dashboard.component';
import { AdminProjectComponent } from './admin-project/admin-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';

import {MatDialogModule} from '@angular/material/dialog';
import { HomeComponent, DialogContentLoginDialog, DialogContentSignupDialog } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FeedComponent,
    ProjectComponent,
    ProfileComponent,
    PagenotfoundComponent,
    DashboardComponent,
    AdminProjectComponent,
    DialogContentNewProjDialog,
    HomeComponent, 
    DialogContentLoginDialog,
    DialogContentSignupDialog,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
