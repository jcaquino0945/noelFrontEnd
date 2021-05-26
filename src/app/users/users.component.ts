import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users$: any[];
  currentUser;
  errMess: string;
  //user = {verified:''}
  constructor(private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe(
      (users$) => (this.users$ = users$),
      (errmess) => (this.errMess = <any>errmess)
    );
    this.currentUser = this.authService.getUserDetails();
  }

  updateVerificationStatus(email,id,value) {
    console.log(email)

    if (window.confirm("Change verification status of user?")) {
      if (value.checked == true) {
        window.alert("User is now verified!");
        this.authService.updateVerification(id,value.checked).subscribe((res: any) => {
          console.log(email)
          this.authService.sendVerificationEmail(email).subscribe((res: any) => {})
          console.log('verified!')
        })
      } 
      if (value.checked == false) {
        window.alert("User is not verified!");
        this.authService.updateVerification(id,value.checked).subscribe((res: any) => {
          console.log('not verified!')
        })
      }
    } 
   }
   updateAdminStatus(id,value) {
    if (window.confirm("Change admin status of user?")) {
      if (value.checked == true) {
        window.alert("User is now an Admin!");
        this.authService.updateAdminStatus(id,value.checked).subscribe((res: any) => {
          console.log('verified!')
        })
      } 
      if (value.checked == false) {
        window.alert("User is now a Member!");
        this.authService.updateAdminStatus(id,value.checked).subscribe((res: any) => {
          console.log('not verified!')
        })
      }
    } 
   }
   deleteUser(userId) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      this.authService.deleteUser(userId).subscribe((res: any)=> {
        this.authService.getUsers().subscribe(
          (users$) => (this.users$ = users$),
          (errmess) => (this.errMess = <any>errmess)
        );
      })
    }
   }
}
