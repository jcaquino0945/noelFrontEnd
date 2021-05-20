
import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
currentUser;
  constructor(private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserDetails();
  }

  logout() {
    this.authService.clear();
    this.router.navigate(['home']);
  }

}

