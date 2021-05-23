import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLogin() {
    const dialogRef = this.dialog.open(DialogContentLoginDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSignup() {
    const dialogRef = this.dialog.open(DialogContentSignupDialog);

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
export class DialogContentLoginDialog {
  user = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  
  login() {
    console.log(this.user.username)
    console.log(this.user.password)

    this.authService
    .validate(this.user.username, this.user.password)
    .then((response) => {
      if (response['token'] == false && response['user'] == false) {
        window.alert('User is not verified yet! Wait for admin to verify your account');
      } else {
      this.authService.setUserInfo(response['token'],response['user']);
      this.router.navigate(['feed']);
      }
    })
    .catch((err) => {
      window.alert('Wrong username/password');
    });  }
}  

/*
export class DialogContentLoginDialog {
  user = { username: '', password: '' };

  constructor(

  ) {}
  ngOnInit(): void {}
  
  login() {

  }
}
*/

@Component({
  selector: 'signup',
  templateUrl: './signup/signup.html',
  styleUrls: ['./signup/signup.css']
})
export class DialogContentSignupDialog {
  user = { username: '', password: '', name: '', contactNumber: '', birthday: '', email: '' };
  errMess: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.authService.register(this.user.username,this.user.password,this.user.name,this.user.contactNumber,this.user.birthday,this.user.email).subscribe((res: any) => {
      window.alert('Registered! Wait for admin to verify your account before you can login!');
      (errmess) => (this.errMess = <any>errmess);
    },
    (err: any) => {
      console.log(err);
    })
  }

}
