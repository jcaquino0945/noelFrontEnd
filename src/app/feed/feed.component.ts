import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { Comment } from '../models/comment';
import { AuthService } from '../services/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (projects$) => (this.projects$ = projects$),
      (errmess) => (this.errMess = <any>errmess)
    );
    this.authenticated=this.authService.isAuthenticated();

  }

}
