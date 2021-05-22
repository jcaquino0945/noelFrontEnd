import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log('profile init')
    this.currentUser = this.authService.getUserDetails();
    console.log(this.currentUser)

  }

}
