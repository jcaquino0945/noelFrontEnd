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
          console.log('comment uploaded')
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
      },
      (err: any) => {
        console.log(err);
      }
      )
    } else {
      this.projectService.addComment(id,this.comment.comment,author,this.file).subscribe((res: any) => {
        if (this.file.type.toString() == 'video/mp4') {
          this.projectService.updateProjectVideo(id,this.projectVideos + 1).subscribe((res: any) => { 
            console.log('video uploaded')
          })
        }
        if (this.file.type.toString() == 'image/png' || this.file.type.toString() == 'image/jpeg') {
          this.projectService.updateProjectImage(id,this.projectImages + 1).subscribe((res: any) => { 
            console.log('image uploaded')
          })
        }
        if (this.file.type.toString() == 'audio/mpeg') {
          this.projectService.updateProjectAudio(id,this.projectAudio + 1).subscribe((res: any) => { 
            console.log('audio uploaded')
          })
        }
        if (this.file.type.toString() == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || this.file.type.toString() == 'application/msword' || this.file.type.toString() == 'text/plain') {
          this.projectService.updateProjectText(id,this.projectText + 1).subscribe((res: any) => { 
            console.log('text uploaded')
          })
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
    window.alert('Comment uploaded!')
    window.location.reload();
  }

  onFileChange(files: FileList) {
    this.file=files[0];
    console.log(this.file)
    window.alert('File uploaded!')
      
  }

}
