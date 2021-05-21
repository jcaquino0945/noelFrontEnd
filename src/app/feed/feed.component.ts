import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { Comment } from '../models/comment';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  projects$: Project[];
  errMess: string;
  authenticated;
  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (projects$) => (this.projects$ = projects$),
      (errmess) => (this.errMess = <any>errmess)
    );
    this.authenticated=this.authService.isAuthenticated();
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
    
}
