import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService, ApiService } from '../_services';

@Component({
  selector: 'app-generalinfo',
  templateUrl: './generalinfo.component.html',
  styleUrls: ['./generalinfo.component.scss']
})
export class GeneralinfoComponent implements OnInit {
  private repoName: string;
  name = null;
  generalinfo = {};

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private api: ApiService,
    private router: Router,
  ) {
    // redirect to home if not logged in
    if (!this.jwtService.loggedIn)
        this.router.navigate(['/']);
  }

  ngOnInit() {
    this.name = this.route.snapshot.params['name'];
    this.generalinfo = this.api.generalinfo(name);
  }

}
