import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    location.href = 'https://discord.com/oauth2/authorize?client_id=168156218941112320&redirect_uri=http://localhost:4200/oauth2&response_type=token&scope=identify+guilds';
  }

}
