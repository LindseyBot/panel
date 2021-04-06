import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrls: ['./oauth2.component.css']
})
export class Oauth2Component implements OnInit {

  error = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragments) => {
      const frags = fragments.split('&');
      let args = [];
      for (let split of frags) {
        const argument = split.split('=');
        args[argument[0]] = argument[1];
      }
      const token = args['access_token'];
      if (token) {
        this.authService.login(token).subscribe(() => {
          this.router.navigate(['/selector']).finally();
        }, () => {
          this.error = true;
        });
      } else {
        this.router.navigate(['/auth/login']).finally();
      }
    });
  }

}
