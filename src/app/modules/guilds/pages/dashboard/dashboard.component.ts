import {Component, OnInit} from '@angular/core';
import {DiscordService} from "../../../../services/discord.service";
import {Guild} from "../../../../entities/guild";
import {StateService} from "../../../../services/state.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  guild: Guild;

  constructor(private discord: DiscordService, private state: StateService) {
  }

  ngOnInit(): void {
    this.discord.getGuild(this.state.guildId).subscribe(guild => this.guild = guild)
  }

}
