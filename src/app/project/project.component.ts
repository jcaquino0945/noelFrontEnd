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
  commentDeleted: Boolean;
  commentSuccess: Boolean;
  comment = { comment: ''};
  file: File = null;
  projects$: Project[];
  project: Project;
  projectIds: string[];
  errMess: string;
  currentUser;
  labelImport: ElementRef;
  projectVideos;
  projectAudio;
  projectImages;
  projectText;

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
          this.projectAudio = project.audio;
          this.projectImages = project.images;
          this.projectVideos = project.videos;
          this.projectText = project.textFiles;
          console.log(this.projectAudio)
          console.log(this.projectImages)
          console.log(this.projectVideos)
          console.log(this.projectText)

        },
        (err) => console.log(err)
      );
    (errmess) => (this.errMess = <any>errmess);
  }

  submitComment(id,author) {
console.log(this.file)
        
    if (!this.file) {
      this.projectService.addComment(id,this.comment.comment,author).subscribe((res: any) => {
        this.projectService.updateProjectText(id,this.projectText + 1).subscribe((res: any) => { 
        })
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
      ,
      (err: any) => {
        console.log(err);
      }
      )
      this.commentSuccess = true;
    }
    else {
      this.projectService.addComment(id,this.comment.comment,author,this.file).subscribe((res: any) => {
        if (this.file.type.toString() == 'video/mp4') {
          this.projectService.updateProjectVideo(id,this.projectVideos + 1).subscribe((res: any) => { 
          })
          this.commentSuccess = true;
        }
        if (this.file.type.toString() == 'image/png' || this.file.type.toString() == 'image/jpeg') {
          this.projectService.updateProjectImage(id,this.projectImages + 1).subscribe((res: any) => { 
          })
          this.commentSuccess = true;
        }
        if (this.file.type.toString() == 'audio/mpeg' || this.file.type.toString() == 'audio/x-m4a') {
          this.projectService.updateProjectAudio(id,this.projectAudio + 1).subscribe((res: any) => { 
          })
          this.commentSuccess = true;
        }
        if (this.file.type.toString() == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || this.file.type.toString() == 'application/msword' || this.file.type.toString() == 'text/plain' || this.file.type.toString() == 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || this.file.type.toString() == 'application/pdf') {
          this.projectService.updateProjectText(id,this.projectText + 1).subscribe((res: any) => { 
          })
          this.commentSuccess = true;
        } 
        //if (this.file)
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
  }

  onFileChange(files: FileList) {
    this.file=files[0];
    console.log(this.file)
    window.alert('File uploaded!')
      
  }

  deleteComment(commentId,userId,projectId,fileType) {
    console.log(commentId)
    console.log(userId)
    console.log(projectId)
    if (window.confirm("Are you sure you want to delete your comment?")) {
      this.projectService.deleteComment(commentId,userId,projectId).subscribe((res: any) => { 

        if (fileType == 'image/jpeg' || fileType == 'image/png') {
          this.projectService.updateProjectImage(projectId,this.projectImages - 1).subscribe((res: any) => { 
          })
          this.commentDeleted = true;
        }
        if (fileType == 'audio/mpeg' || fileType == 'audio/x-m4a') {
          this.projectService.updateProjectAudio(projectId,this.projectAudio - 1).subscribe((res: any) => { 
          })
          this.commentDeleted = true;
        }
        if (fileType == 'video/mp4') {
          this.projectService.updateProjectVideo(projectId,this.projectVideos - 1).subscribe((res: any) => { 
          })
          this.commentDeleted = true;
        }
        if (fileType == 'comment' || fileType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileType == 'application/msword' || fileType == 'text/plain' || this.file.type.toString() == 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || this.file.type.toString() == 'application/pdf') {
          this.projectService.updateProjectText(projectId,this.projectText - 1).subscribe((res: any) => { 
          })
          this.commentDeleted = true;
        }
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
      })
      this.commentDeleted = true;
    }
    
  }

  resetNotifications() {
    this.commentDeleted = false;
    this.commentSuccess = false;
  }

}
