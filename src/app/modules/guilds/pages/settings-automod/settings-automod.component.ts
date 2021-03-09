import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DiscordService} from "../../../../services/discord.service";
import {Guild} from "../../../../entities/guild";

@Component({
  selector: 'settings-automod',
  templateUrl: './settings-automod.component.html',
  styleUrls: ['./settings-automod.component.css']
})
export class SettingsAutomodComponent implements OnInit {

  guild: Guild;

  constructor(private route: ActivatedRoute, private discord: DiscordService) {
  }

  ngOnInit(): void {
    this.discord.getGuild(this.route.snapshot.paramMap.get('guild')).subscribe(guild => this.guild = guild);
  }

}
