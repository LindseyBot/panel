import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Guild} from "../../../../entities/guild";
import {ActivatedRoute} from "@angular/router";
import {DiscordService} from "../../../../services/discord.service";
import {FormService} from "../../../../services/form.service";
import {ServerSettingsService} from "../../services/server-settings.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-settings-embeds',
  templateUrl: './settings-embeds.component.html',
  styleUrls: ['./settings-embeds.component.css']
})
export class SettingsEmbedsComponent implements OnInit {

  form: FormGroup;
  changesDetected: boolean = false;
  loading: boolean = true;

  guild: Guild;
  isEnabled = false;

  constructor(private route: ActivatedRoute, private discord: DiscordService,
              private formBuilder: FormBuilder, private formService: FormService,
              private service: ServerSettingsService, private nzNotifications: NzNotificationService) {
    this.form = this.formBuilder.group({
      apoiase: new FormControl(null, []),
      catarse: new FormControl(null, []),
      kitsu: new FormControl(null, []),
      myAnimeList: new FormControl(null, []),
      picarto: new FormControl(null, []),
    });
  }

  ngOnInit(): void {
    this.discord.getGuild(this.route.snapshot.paramMap.get('guild')).subscribe(guild => {
      this.guild = guild;
      this.service.fetchEmbeds(guild.id).subscribe(settings => {
        this.form.patchValue(settings);
        this.changesDetected = false;
        this.loading = false;
      });
    });
    // Listen to changes
    this.form.valueChanges.subscribe(() => {
      if (this.loading) {
        return;
      }
      if (!this.changesDetected) {
        this.changesDetected = true;
      }
    });
  }

  save(): void {
    let valid = this.formService.check(this.form);
    if (!valid) {
      return;
    }
    this.loading = true;
    this.service.putEmbeds(this.guild.id, this.form.getRawValue()).subscribe(result => {
      this.form.reset(result);
      this.changesDetected = false;
      this.nzNotifications.success('SUCCESS', 'Settings saved successfully', {
        nzDuration: 5000
      });
      this.loading = false;
    }, (_) => {
      this.nzNotifications.error('Failed to save settings', _.error.message, {
        nzDuration: 5000
      });
      this.loading = false;
    });
  }

}
