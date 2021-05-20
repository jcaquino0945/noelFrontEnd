import { Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authenticated;
  title = 'noelFrontEnd';
  constructor(private authService: AuthService
    ) { }

    ngOnInit(): void {
      this.authenticated=this.authService.isAuthenticated();
    }
}
