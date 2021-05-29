import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.css']
})
export class AdminProjectComponent implements OnInit {
  projects$: Project[];
  project: Project;
  projectIds: string[];
  currentUser;
  data = { name: '',description: ''};
  commentSuccess: Boolean;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserDetails();

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
          this.project = project, this.data.name = project.name,this.data.description = project.description;
        }
      );

      this.projectService.getProjects().subscribe(
        (projects$) => (this.projects$ = projects$)
      );
  }
  editProject(id) {
    console.log(this.data.name)
    console.log(this.data.description)
    this.projectService.editProject(id,this.data.name,this.data.description).subscribe((res: any) => {
      console.log('success');
      this.commentSuccess = true;

    },
    (err: any) => {
      console.log(err);
    })
  }

  resetNotifications() {
    this.commentSuccess = false;
  }

}
