import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzSelectOptionInterface} from 'ng-zorro-antd/select';
import {ActivatedRoute} from '@angular/router';
import {Guild} from '../../../../entities/guild';
import {DiscordService} from '../../../../services/discord.service';
import {ServerSettingsService} from '../../services/server-settings.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-settings-core',
  templateUrl: './settings-core.component.html',
  styleUrls: ['./settings-core.component.css']
})
export class SettingsCoreComponent implements OnInit {

  form: FormGroup;
  changesDetected = false;
  loading = true;

  guild: Guild;

  // ------------------------------------------------------------------------

  languages: NzSelectOptionInterface[] = [
    {
      value: 'en_US',
      label: 'English (US)',
    }
  ];

  constructor(private route: ActivatedRoute,
              private discord: DiscordService,
              private formBuilder: FormBuilder,
              private service: ServerSettingsService,
              private nzNotifications: NzNotificationService) {
    this.form = this.formBuilder.group({
      language: new FormControl(null, [
        Validators.required
      ]),
      ignoredChannels: new FormControl(null, [])
    });
  }

  ngOnInit(): void {
    this.discord.getGuild(this.route.snapshot.paramMap.get('guild')).subscribe(guild => {
      this.guild = guild;
      this.service.fetchSettings(guild.id).subscribe(profile => {
        profile.language = profile.language['id']; // needs to be just the id
        this.form.reset(profile);
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

  onSubmit(event: any): void {
    event.preventDefault();
    if (!this.form.valid) {
      return;
    }
    this.loading = true;
    this.service.putSettings(this.guild.id, this.form.getRawValue()).subscribe(result => {
      result.language = result.language['id']; // needs to be just the id
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
