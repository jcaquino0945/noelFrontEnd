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
    this.dialog.open(disclaimerDialog);
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
  user = { username: '', password: '', name: '', contactNumber: '',address: '', birthday: '', email: '' };
  errMess: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.authService.register(this.user.username,this.user.password,this.user.name,this.user.contactNumber,this.user.address,this.user.birthday,this.user.email).subscribe((res: any) => {
      window.alert('Registered! Wait for admin to verify your account before you can login!');
      (errmess) => (this.errMess = <any>errmess);
    },
    (err: any) => {
      console.log(err);
    })
  }

}


@Component({
  selector: 'dialog-elements-example-dialog',
  template: `
  <div id="content"> 
    <h1 mat-dialog-title>User Disclaimer</h1>
    <div mat-dialog-content>I am aware that being user  in this web application , the web administrators  will have access to my personal data in order to provide assistance to my concerns. Therefore, I give consent to them to use my personal data for this web application purposes only.</div>
    <div class="action" mat-dialog-actions>
      <button mat-button mat-dialog-close>Okay</button>
    </div>
  </div>
  `,
  styles: [
    `
    #content{
      color: #000;
    }

    .action {
      float: right;
    }
    .action button{
      padding: .5em 4em;
      width: 100%;
      margin-top: .5em;
    }
    .action button{
      background: #58B761;
      outline: none;
      border: #58B761;
      color: #ffffff;
      transition: all 0.3s ease 0s;
    }
    .action button:hover{
      background: #4a9b52;
    }
    `
  ]
})

export class disclaimerDialog {}