import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }

  openMessage() {
    const dialogRef = this.dialog.open(DialogContentNewProjDialog);

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
  constructor(
    ) {}

    ngOnInit(): void {
    }
}