import {Component, OnInit} from '@angular/core';
import {Guild} from "../../entities/guild";
import {DiscordService} from "../../services/discord.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-guild-list',
  templateUrl: './guild-list.component.html',
  styleUrls: ['./guild-list.component.css']
})
export class GuildListComponent implements OnInit {

  guilds: Guild[] = [];

  constructor(private discord: DiscordService, private router: Router) {
  }

  ngOnInit(): void {
    this.guilds = this.discord.getGuilds();
  }

  select(id: string) {
    this.router.navigate(['panel', id, 'overview']);
  }

}
