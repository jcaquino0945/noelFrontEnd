import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { ProjectComponent } from './project/project.component';
import { ProfileComponent } from './profile/profile.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminProjectComponent } from './admin-project/admin-project.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'feed', component: FeedComponent,canActivate : [AuthGuard]},
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent,canActivate : [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent,canActivate : [AuthGuard] },
  { path: 'dashboard/project/:id', component: AdminProjectComponent,canActivate : [AuthGuard] },
  { path: 'feed/project/:id', component: ProjectComponent,canActivate : [AuthGuard] },
  { path: 'users', component: UsersComponent,canActivate : [AuthGuard] },

  
  { path: '',   redirectTo: '/feed', pathMatch: 'full' }, // redirect to `feed`
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
