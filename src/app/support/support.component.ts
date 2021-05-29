import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  user = { subject: '', content: '' };
  currentUser;
  errMess: string;

  constructor(
    private authService: AuthService,
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserDetails();
  }

  send(name, email) {
    console.log(email)
    console.log(name)
    console.log(this.user.subject)
    console.log(this.user.content)

    this.contactService.sendMessage(name, email, this.user.subject, this.user.content).subscribe((res: any) => {
      window.alert('Message sent!');
      (errmess) => (this.errMess = <any>errmess);
    },
    (err: any) => {
      console.log(err);
    })
  }

}
