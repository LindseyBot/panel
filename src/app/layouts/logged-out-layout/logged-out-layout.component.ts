import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-logged-out-layout',
  templateUrl: './logged-out-layout.component.html',
  styleUrls: ['./logged-out-layout.component.css']
})
export class LoggedOutLayoutComponent implements OnInit {

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
  }

  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }

}
