import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent, DialogLogoutDialog } from './sidebar/sidebar.component';
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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatDialogModule} from '@angular/material/dialog';
import { HomeComponent, DialogContentLoginDialog, DialogContentSignupDialog } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { SupportComponent } from './support/support.component';
import { MessagesComponent } from './messages/messages.component';


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
    UsersComponent,
    DialogLogoutDialog,
    SupportComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
