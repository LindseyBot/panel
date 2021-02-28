import {Component, OnInit} from '@angular/core';
import {StateService} from "./services/state.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {User} from "./modules/auth/entities/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: User;
  isCollapsed = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private authService: AuthService, public state: StateService) {
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => this.user = user);
    this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      const data = this.activatedRoute.firstChild.snapshot.data;
    });
  }

  isUserRoute(): boolean {
    return this.router.url.indexOf('guilds') == -1;
  }

}
