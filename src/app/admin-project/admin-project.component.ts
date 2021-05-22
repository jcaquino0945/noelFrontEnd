import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.css']
})
export class AdminProjectComponent implements OnInit {
  projects$: Project[];
  project: Project;
  projectIds: string[];

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.projectService.getProjectIds().subscribe(
      (projectIds) => (this.projectIds = projectIds)
    )
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.projectService.getProject(params['id']);
        })
      )
      .subscribe(
        (project) => {
          this.project = project;
        }
      );

      this.projectService.getProjects().subscribe(
        (projects$) => (this.projects$ = projects$)
      );
  }

}
