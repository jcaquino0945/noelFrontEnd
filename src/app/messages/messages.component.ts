import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  contact$: Contact[];
  errMess: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contactService.getMessage().subscribe(
      (contact$) => (this.contact$ = contact$),
      (errmess) => (this.errMess = <any>errmess)
    );

  }

  openMessage() {
    const dialogRef = this.dialog.open(DialogContentNewProjDialog, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
@Component({
  selector: 'message',
  templateUrl: './message-content/message-content.html',
  styleUrls: ['./message-content/message-content.css']
})
export class DialogContentNewProjDialog implements OnInit {
  constructor() {}

    ngOnInit(): void {
    }
}