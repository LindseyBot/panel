import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Guild} from "../../../../entities/guild";
import {ActivatedRoute} from "@angular/router";
import {DiscordService} from "../../../../services/discord.service";
import {FormService} from "../../../../services/form.service";
import {ServerSettingsService} from "../../services/server-settings.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-settings-starboard',
  templateUrl: './settings-starboard.component.html',
  styleUrls: ['./settings-starboard.component.css']
})
export class SettingsStarboardComponent implements OnInit {

  form: FormGroup;
  changesDetected: boolean = false;
  loading: boolean = true;

  guild: Guild;
  isEnabled = false;

  constructor(private route: ActivatedRoute, private discord: DiscordService,
              private formBuilder: FormBuilder, private formService: FormService,
              private service: ServerSettingsService, private nzNotifications: NzNotificationService) {
    this.form = this.formBuilder.group({
      enabled: new FormControl(null, [
        Validators.required
      ]),
      minStars: new FormControl(null, [
        Validators.min(1),
        Validators.max(10)
      ]),
      channel: new FormControl(null, [])
    });
  }

  ngOnInit(): void {
    this.discord.getGuild(this.route.snapshot.paramMap.get('guild')).subscribe(guild => {
      this.guild = guild;
      this.service.fetchStarboard(guild.id).subscribe(settings => {
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
    const values = this.form.getRawValue();
    if (values.enabled) {
      let error = false;
      if (!values.channel) {
        this.form.get('channel').setErrors({required: true});
        error = true;
      }
      if (!values.minStars) {
        this.form.get('channel').setErrors({required: true});
        error = true;
      }
      if (error) {
        return;
      }
    }
    this.loading = true;
    this.service.putStarboard(this.guild.id, this.form.getRawValue()).subscribe(result => {
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
