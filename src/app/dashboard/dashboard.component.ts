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

  constructor(
    private authService: AuthService,
    private router: Router,
    private projectService: ProjectService,
    ) {}

    ngOnInit(): void {
      this.currentUser = this.authService.getUserDetails();
    }

  addProject() {
    
      console.log(this.data.name)
      console.log(this.data.description)
      console.log(this.data.file)
      this.projectService.addProject(this.data.name,this.data.description,this.currentUser.user._id,this.data.file).subscribe((res: any) => {
        console.log('success');
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