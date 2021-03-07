import {Component, OnInit} from '@angular/core';
import {DiscordService} from "../../../../services/discord.service";
import {Guild} from "../../../../entities/guild";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  guild: Guild;

  constructor(private discord: DiscordService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('guild');
    this.discord.getGuild(id).subscribe(guild => this.guild = guild)
  }

}
