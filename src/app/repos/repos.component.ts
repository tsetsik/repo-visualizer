import { Component, OnInit } from '@angular/core';
import { JwtService, ApiService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {
  repos: Array<any> = [];

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private api: ApiService,
  ) {
    // redirect to home if not logged in
    if (!this.jwtService.loggedIn)
        this.router.navigate(['/']);

    this.api.repos().subscribe(resp => {
      this.repos = resp;
    });
  }

  ngOnInit() {}
}
