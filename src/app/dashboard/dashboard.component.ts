import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser;
  projects$: Project[];
  errMess: string;
  commentSuccess: Boolean;
  commentDeleted: Boolean;


  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserDetails();

    this.projectService.getProjects().subscribe(
      (projects$) => (this.projects$ = projects$)
    )
  }
  resetNotifications() {
    this.commentSuccess = false;
    this.commentDeleted = false;
  }

  deleteProject(projId,author) {
    if (window.confirm("Are you sure you want to delete your project?")) {
      this.projectService.deleteProject(projId,this.currentUser.user._id).subscribe((res: any) => {
        this.projectService.getProjects().subscribe(
          (projects$) => (this.projects$ = projects$)
        )
        this.commentDeleted = true;
        
        (errmess) => (this.errMess = <any>errmess);
      },
      (err: any) => {
        console.log(err);
      })
     
    }
    
}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentNewProjDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'form',
  templateUrl: './form/form.html',
  styleUrls: ['./form/form.css']
})
export class DialogContentNewProjDialog implements OnInit {
  data = { name: '',description: '', file: File = null};
  currentUser;
  errMess: string;
  projects$: Project[];
  commentSuccess: Boolean;
  commentDeleted: Boolean;
  projectss$: Project[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private projectService: ProjectService,
    ) {}

    ngOnInit(): void {
      this.currentUser = this.authService.getUserDetails();
    }
    resetNotifications() {
      this.commentSuccess = false;
      this.commentDeleted = false;
    }
  
//
  addProject() {
    
      console.log(this.data.name)
      console.log(this.data.description)
      console.log(this.data.file)
      this.projectService.addProject(this.data.name,this.data.description,this.currentUser.user._id,this.data.file).subscribe((res: any) => {
        (errmess) => (this.errMess = <any>errmess);
      },
      (err: any) => {
        console.log(err);
      })
      
  }

  

  onFileChange(files: FileList) {
    this.data.file=files[0];
    console.log(this.data.file)
    window.alert('File uploaded!')
      
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  template: `
  <h1 mat-dialog-title>User Disclaimer</h1>
  <div mat-dialog-content>I am aware that being user  in this web application , the web administrators  will have access to my personal data in order to provide assistance to my concerns. Therefore, I give consent to them to use my personal data for this web application purposes only.</div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Okay</button>
  </div>
  `,
})
export class disclaimerDialog {}