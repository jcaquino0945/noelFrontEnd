import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { Comment } from '../models/comment';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  projects$: Project[];
  errMess: string;

  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (projects$) => (this.projects$ = projects$),
      (errmess) => (this.errMess = <any>errmess)
    );
  }

}
