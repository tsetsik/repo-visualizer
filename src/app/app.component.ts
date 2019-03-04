import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Repo Visualizer';
  username = null;

  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {
    if (this.jwtService.loggedIn) {
      let data = this.jwtService.data();
      this.username = data['username'];
    }
  }

  logout() {
    this.jwtService.logout();
    this.router.navigate(['']);
    this.username = null;
  }
}
