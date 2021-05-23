import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
currentUser;
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    console.log('sidebar init')
    this.currentUser = this.authService.getUserDetails();
  }

  logout() {
    this.authService.clear();
    this.router.navigate(['home']);
    window.location.reload();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogLogoutDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'logout-dialog',
  templateUrl: './logout-dialog/logout.html',
  styleUrls: ['./logout-dialog/logout.css']
})
export class DialogLogoutDialog {}