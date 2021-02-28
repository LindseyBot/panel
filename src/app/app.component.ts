import {Component, OnInit} from '@angular/core';
import {StateService} from "./services/state.service";
import {Router} from "@angular/router";
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

  constructor(public state: StateService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => this.user = user);
  }

  isUserRoute(): boolean {
    return this.router.url.indexOf('guilds') == -1;
  }

}
