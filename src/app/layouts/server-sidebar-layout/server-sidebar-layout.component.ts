import {Component, OnInit} from '@angular/core';
import {User} from "../../modules/auth/entities/user";
import {AuthService} from "../../services/auth.service";
import {StateService} from "../../services/state.service";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-server-sidebar-layout',
  templateUrl: './server-sidebar-layout.component.html',
  styleUrls: ['./server-sidebar-layout.component.css']
})
export class ServerSidebarLayoutComponent implements OnInit {

  user: User;
  isCollapsed = false;

  constructor(private authService: AuthService, public state: StateService, private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => this.user = user);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }

}
