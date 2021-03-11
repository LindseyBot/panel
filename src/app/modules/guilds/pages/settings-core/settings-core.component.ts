import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../../../services/form.service";
import {NzSelectOptionInterface} from "ng-zorro-antd/select";
import {ActivatedRoute} from "@angular/router";
import {Guild} from "../../../../entities/guild";
import {DiscordService} from "../../../../services/discord.service";
import {ServerSettingsService} from "../../services/server-settings.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'settings-core',
  templateUrl: './settings-core.component.html',
  styleUrls: ['./settings-core.component.css']
})
export class SettingsCoreComponent implements OnInit {

  form: FormGroup;
  changesDetected: boolean = false;
  loading: boolean = true;

  guild: Guild;

  // ------------------------------------------------------------------------

  languages: NzSelectOptionInterface[] = [
    {
      value: 'en_US',
      label: 'English (US)',
    }
  ];

  constructor(private route: ActivatedRoute, private discord: DiscordService,
              private formBuilder: FormBuilder, private formService: FormService,
              private service: ServerSettingsService, private nzNotifications: NzNotificationService) {
    this.form = this.formBuilder.group({
      prefix: ['', [Validators.maxLength(8), Validators.pattern('[^\\s]*')]],
      language: ['', [Validators.required]],
      keepRolesEnabled: ['', [Validators.required]],
      modLogEnabled: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.discord.getGuild(this.route.snapshot.paramMap.get('guild')).subscribe(guild => {
      this.guild = guild;
      this.service.fetchSettings(guild.id).subscribe(profile => {
        this.form.patchValue(profile);
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
    this.service.putSettings(this.guild.id, this.form.getRawValue()).subscribe(result => {
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
