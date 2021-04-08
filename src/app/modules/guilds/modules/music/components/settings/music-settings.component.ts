import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Guild} from "../../../../../../entities/guild";
import {ActivatedRoute} from "@angular/router";
import {DiscordService} from "../../../../../../services/discord.service";
import {ServerSettingsService} from "../../../../services/server-settings.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzSelectOptionInterface} from "ng-zorro-antd/select";
import {skipWhile} from "rxjs/operators";

@Component({
  selector: 'app-settings-music',
  templateUrl: './music-settings.component.html',
  styleUrls: ['./music-settings.component.css']
})
export class MusicSettingsComponent implements OnInit {

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

  constructor(
    private route: ActivatedRoute,
    private discord: DiscordService,
    private formBuilder: FormBuilder,
    private service: ServerSettingsService,
    private nzNotifications: NzNotificationService
  ) {
    this.form = this.formBuilder.group({
      logTracks: new FormControl(null, [
        Validators.required
      ]),
      logChannel: new FormControl(null, []),
      mode: new FormControl(null, [
        Validators.required
      ]),
      activePlayList: new FormControl(null, [])
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
    this.form.valueChanges.pipe(skipWhile(() => this.loading)).subscribe(() => {
      if (!this.changesDetected) {
        this.changesDetected = true;
      }
    });
    // Disable logChannel in case logTracks is disabled
    this.form.get('logTracks').valueChanges.subscribe((value) => {
      const control = this.form.get('logChannel');
      if (value) {
        control.enable();
        control.setValidators([Validators.required]);
      } else {
        control.disable();
        control.clearValidators();
      }
      control.updateValueAndValidity();
    });
    // Disable playlist selector in case mode is Queue
    this.form.get('mode').valueChanges.subscribe((value) => {
      const control = this.form.get('activePlayList');
      if (value === 'PLAYLIST') {
        control.enable();
        control.setValidators([Validators.required]);
      } else {
        control.disable();
        control.clearValidators();
      }
      control.updateValueAndValidity();
    });
  }

  onSubmit(event: any): void {
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
