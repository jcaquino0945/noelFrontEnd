import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  contact$: Contact[];
  errMess: string;
  currentUser;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserDetails();
    this.contactService.getMessage().subscribe(
      (contact$) => (this.contact$ = contact$),
      (errmess) => (this.errMess = <any>errmess)
    );
  }

  openMessage(name, subject, date, content,  email) {
    const dialogRef = this.dialog.open(DialogContentReplyDialog, {
      data: {
        name: name,
        date: date,
        content: content,
        subject: subject,
        email: email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteMessage(contactId) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      this.contactService.deleteContact(contactId).subscribe((res: any)=> {
        this.contactService.getMessage().subscribe(
          (contact$) => (this.contact$ = contact$),
          (errmess) => (this.errMess = <any>errmess)
        );
      })
    }
  }
}

// export class userMessage {
//   constructor(public dialog: MatDialog) {}


// }

@Component({
  selector: 'message',
  templateUrl: './message-content/message-content.html',
  styleUrls: ['./message-content/message-content.css']
})
export class DialogContentReplyDialog implements OnInit {
  user = { reply: '' };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data, 
    private contactService: ContactService
    ) {}

    ngOnInit(): void {
      
    }

    reply() {
      console.log(this.data.email)
      console.log(this.data.name)
      console.log(this.data.subject)
      console.log(this.user.reply )

      let emailDetail = {
        to: this.data.email,
        subject: `Our admin has replied to your query.`,  
        html: 
        `
          
          <div> 
            <h3> From: ${ this.data.name } </h3>
            <span> Subject: ${ this.data.subject } </span>
            <br>
            <p> Reply: ${ this.user.reply } </p>
          </div>
        `
      }
      console.log( emailDetail )

      this.contactService.sendReceipt(emailDetail);

    }
}