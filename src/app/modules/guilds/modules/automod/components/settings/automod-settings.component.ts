import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Guild} from '../../../../../../entities/guild';
import {ActivatedRoute} from '@angular/router';
import {DiscordService} from '../../../../../../services/discord.service';
import {FormService} from '../../../../../../services/form.service';
import {ServerSettingsService} from '../../../../services/server-settings.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {skipWhile} from 'rxjs/operators';

@Component({
  selector: 'app-automod-settings',
  templateUrl: './automod-settings.component.html',
  styleUrls: ['./automod-settings.component.css']
})
export class AutomodSettingsComponent implements OnInit {

  form: FormGroup;
  changesDetected: boolean = false;
  loading: boolean = true;

  guild: Guild;

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
  }

  onSubmit(event: any): void {
    event.preventDefault();
    if (!this.form.valid) {
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
