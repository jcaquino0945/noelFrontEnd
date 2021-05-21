import { Component, OnInit, ElementRef } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { Comment } from '../models/comment';
import { Router } from '@angular/router';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  comment = { comment: ''};
  file: File = null;
  projects$: Project[];
  project: Project;
  projectIds: string[];
  errMess: string;
  currentUser;
  labelImport: ElementRef;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserDetails();

    this.projectService
      .getProjectIds()
      .subscribe((projectIds) => (this.projectIds = projectIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.projectService.getProject(params['id']);
        })
      )
      .subscribe(
        (project) => {
          this.project = project;
        },
        (err) => console.log(err)
      );
    (errmess) => (this.errMess = <any>errmess);
  }

  submitComment(id,author) {

        
    if (!this.file) {
      this.projectService.addComment(id,this.comment.comment,author).subscribe((res: any) => {
        this.projectService
      .getProjectIds()
      .subscribe((projectIds) => (this.projectIds = projectIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.projectService.getProject(params['id']);
        })
      )
      .subscribe(
        (project) => {
          this.project = project;
        },
        (err) => console.log(err)
      );
    (errmess) => (this.errMess = <any>errmess);
      },
      (err: any) => {
        console.log(err);
      }
      )
    } else {
      this.projectService.addComment(id,this.comment.comment,author,this.file).subscribe((res: any) => {
        
        this.projectService
      .getProjectIds()
      .subscribe((projectIds) => (this.projectIds = projectIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.projectService.getProject(params['id']);
        })
      )
      .subscribe(
        (project) => {
          this.project = project;
        },
        (err) => console.log(err)
      );
    (errmess) => (this.errMess = <any>errmess);
      },
      (err: any) => {
        console.log(err);
      }
      )
    }
    window.alert('Comment uploaded!')

  }

  onFileChange(files: FileList) {
    this.file=files[0];
    console.log(this.file)
    window.alert('File uploaded!')
      
  }

}
