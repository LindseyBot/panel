import {Component} from '@angular/core';
import {StateService} from "./services/state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public state: StateService, private router: Router) {
  }

  isCollapsed = false;

  isUserRoute(): boolean {
    return this.router.url.indexOf('guilds') == -1;
  }

}
