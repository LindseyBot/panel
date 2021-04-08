import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Guild} from "../../../../../../entities/guild";
import {ActivatedRoute} from "@angular/router";
import {DiscordService} from "../../../../../../services/discord.service";
import {ServerSettingsService} from "../../../../services/server-settings.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {skipWhile} from "rxjs/operators";

@Component({
  selector: 'app-settings-starboard',
  templateUrl: './starboard-settings.component.html',
  styleUrls: ['./starboard-settings.component.css']
})
export class StarboardSettingsComponent implements OnInit {

  form: FormGroup;
  changesDetected: boolean = false;
  loading: boolean = true;

  guild: Guild;

  constructor(
    private route: ActivatedRoute,
    private discord: DiscordService,
    private formBuilder: FormBuilder,
    private service: ServerSettingsService,
    private nzNotifications: NzNotificationService
  ) {
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
    // Disable stars and channels if enabled is false
    this.form.get('enabled').valueChanges.subscribe((value) => {
      const starsControl = this.form.get('minStars');
      const channelControl = this.form.get('channel');
      if (value) {
        starsControl.enable();
        starsControl.setValidators([Validators.min(1), Validators.max(10), Validators.required]);
        channelControl.enable();
        channelControl.setValidators([Validators.required]);
      } else {
        starsControl.disable();
        starsControl.clearValidators();
        channelControl.disable();
        channelControl.clearValidators();
      }
      starsControl.updateValueAndValidity();
      channelControl.updateValueAndValidity();
    });
  }

  onSubmit(event: any): void {
    event.preventDefault();
    if (!this.form.valid) {
      return;
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
