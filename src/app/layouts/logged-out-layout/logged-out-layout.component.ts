import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {User} from '../../modules/auth/entities/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-logged-out-layout',
  templateUrl: './logged-out-layout.component.html',
  styleUrls: ['./logged-out-layout.component.css']
})
export class LoggedOutLayoutComponent implements OnInit {

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
