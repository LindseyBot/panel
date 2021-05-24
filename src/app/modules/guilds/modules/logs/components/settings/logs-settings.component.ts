import {Component, OnInit} from '@angular/core';
import {AuditMessage} from "../../../../../../entities/audit-message";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {GuildLogsService} from "../../guild-logs.service";
import {Guild} from "../../../../../../entities/guild";
import {ActivatedRoute} from "@angular/router";
import {DiscordService} from "../../../../../../services/discord.service";

@Component({
  selector: 'app-settings',
  templateUrl: './logs-settings.component.html',
  styleUrls: ['./logs-settings.component.css']
})
export class LogsSettingsComponent implements OnInit {

  loading: boolean = true;
  data: AuditMessage[];

  total: number = 100;
  page: number = 0;
  size: number = 15;

  guild: Guild;

  constructor(private route: ActivatedRoute, private discord: DiscordService,
              private service: GuildLogsService) {
  }

  ngOnInit(): void {
    this.discord.getGuild(this.route.snapshot.paramMap.get('guild')).subscribe(guild => {
      this.guild = guild;
      this.onQueryParamsChange({
        pageIndex: 1,
        pageSize: 50,
        sort: [],
        filter: []
      });
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageIndex} = params;
    this.page = pageIndex - 1;
    this.service.fetch(this.guild.id, this.page).subscribe(data => {
      this.data = data.items;
      this.total = data.last ? data.items.length : 101;
      this.loading = false;
    }, (_) => {
      this.loading = false;
    });
  }

  toLocalTime(time: string) {
    const date = new Date(time);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    return date.toLocaleDateString(undefined, options);
  }

}
