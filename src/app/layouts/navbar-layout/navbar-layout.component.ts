import {Component, OnInit} from '@angular/core';
import {User} from "../../modules/auth/entities/user";
import {AuthService} from "../../services/auth.service";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-navbar-layout',
  templateUrl: './navbar-layout.component.html',
  styleUrls: ['./navbar-layout.component.css']
})
export class NavbarLayoutComponent implements OnInit {

  isCollapsed = false;
  user: User;

  constructor(private authService: AuthService, private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => this.user = user);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }

}
