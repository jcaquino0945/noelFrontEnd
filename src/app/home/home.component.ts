import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(public loginDialog: MatDialog, public signupDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLogin() {
    const dialogRef = this.loginDialog.open(DialogContentLoginDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSignup() {
    const dialogRef = this.signupDialog.open(DialogContentSignupDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'login',
  templateUrl: './login/login.html',
  styleUrls: ['./login/login.css']
})
export class DialogContentLoginDialog {}

@Component({
  selector: 'signup',
  templateUrl: './signup/signup.html',
  styleUrls: ['./signup/signup.css']
})
export class DialogContentSignupDialog {}
