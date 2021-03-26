import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    location.href = 'https://discord.com/oauth2/authorize?client_id=168156218941112320&redirect_uri='
      + environment.OAUTH_REDIRECT_URL + '&response_type=token&scope=identify+guilds';
  }

}
