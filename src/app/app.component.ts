import { Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authenticated;
  title = 'SOAP RCSSED';
  constructor(private authService: AuthService,
    private titleService: Title
    ) { }

    ngOnInit(): void {
      this.authenticated=this.authService.isAuthenticated();
      this.titleService.setTitle(this.title);
    }
}
