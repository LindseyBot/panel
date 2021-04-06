import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Guild} from "../../../../entities/guild";
import {ActivatedRoute} from "@angular/router";
import {DiscordService} from "../../../../services/discord.service";
import {FormService} from "../../../../services/form.service";
import {ServerSettingsService} from "../../services/server-settings.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzSelectOptionInterface} from "ng-zorro-antd/select";

@Component({
  selector: 'app-settings-music',
  templateUrl: './settings-music.component.html',
  styleUrls: ['./settings-music.component.css']
})
export class SettingsMusicComponent implements OnInit {

  form: FormGroup;
  changesDetected: boolean = false;
  loading: boolean = true;

  guild: Guild;
  modes: NzSelectOptionInterface[] = [
    {
      label: 'Queue',
      value: 'QUEUE'
    },
    {
      label: 'PlayList',
      value: 'PLAYLIST'
    }
  ];

  constructor(private route: ActivatedRoute, private discord: DiscordService,
              private formBuilder: FormBuilder, private formService: FormService,
              private service: ServerSettingsService, private nzNotifications: NzNotificationService) {
    this.form = this.formBuilder.group({
      logTracks: ['', [Validators.required]],
      logChannel: [''],
      mode: ['', Validators.required],
      activePlayList: ['']
    });
  }

  ngOnInit(): void {
    this.discord.getGuild(this.route.snapshot.paramMap.get('guild')).subscribe(guild => {
      this.guild = guild;
      this.service.fetchMusic(this.guild.id).subscribe(settings => {
        this.form.reset(settings);
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

  onSubmit(event: any) {
    event.preventDefault();
    if (!this.form.valid) {
      return;
    }
    this.loading = true;
    this.service.putMusic(this.guild.id, this.form.getRawValue()).subscribe(result => {
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
