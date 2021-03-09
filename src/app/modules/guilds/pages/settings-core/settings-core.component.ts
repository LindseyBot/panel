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
  loading: boolean = false;

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
      keepRolesEnabled: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.discord.getGuild(this.route.snapshot.paramMap.get('guild')).subscribe(guild => {
      this.guild = guild;
      this.load(this.guild.id);
    });
    // Listen to changes
    this.form.valueChanges.subscribe(() => {
      if (!this.changesDetected) {
        this.changesDetected = true;
      }
    });
  }

  private load(guildId: string): void {
    this.loading = true;
    this.service.fetch(guildId).subscribe(profile => {
      this.loading = false;
      this.form.patchValue(profile);
    });
  }

  save(): void {
    let valid = this.formService.check(this.form);
    if (!valid) {
      return;
    }
    this.loading = true;
    this.service.put(this.guild.id, this.form.getRawValue()).subscribe(result => {
      this.loading = false;
      this.form.reset(result);
      this.nzNotifications.success('SUCCESS', 'Settings saved successfully', {
        nzDuration: 5000
      });
    }, (_) => {
      this.loading = false;
      this.nzNotifications.error('Failed to save settings', _.error.message, {
        nzDuration: 5000
      });
    });
  }

}
