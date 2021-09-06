import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Guild} from '../../../../../../entities/guild';
import {FormService} from '../../../../../../services/form.service';
import {ServerSettingsService} from '../../../../services/server-settings.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {skipWhile} from 'rxjs/operators';

@Component({
  selector: 'automod-antiad',
  templateUrl: './tab-antiad.component.html',
  styleUrls: ['./tab-antiad.component.css']
})
export class TabAntiadComponent implements OnInit {

  form: FormGroup;
  changesDetected: boolean = false;
  loading: boolean = true;

  @Input()
  guild: Guild;

  constructor(private formBuilder: FormBuilder, private formService: FormService,
              private service: ServerSettingsService, private nzNotifications: NzNotificationService) {
    this.form = this.formBuilder.group({
      enabled: new FormControl(null, [
        Validators.required
      ]),
      strikes: new FormControl(null, [
        Validators.min(1),
        Validators.max(10)
      ])
    });
  }

  ngOnInit(): void {
    this.service.fetchAntiAd(this.guild.id).subscribe(settings => {
      this.form.reset(settings);
      this.loading = false;
    });
    // Listen to changes
    this.form.valueChanges.pipe(skipWhile(() => this.loading)).subscribe(() => {
      if (!this.changesDetected) {
        this.changesDetected = true;
      }
    });
    // Disable stars and channels if enabled is false
    this.form.get('enabled').valueChanges.subscribe((value) => {
      const strikes = this.form.get('strikes');
      if (value) {
        strikes.enable();
        strikes.setValidators([Validators.min(1), Validators.max(10), Validators.required]);
      } else {
        strikes.disable();
        strikes.clearValidators();
      }
      strikes.updateValueAndValidity();
    });
  }

  onSubmit(event: any): void {
    event.preventDefault();
    if (!this.form.valid) {
      return;
    }
    this.loading = true;
    this.service.putAntiAd(this.guild.id, this.form.getRawValue()).subscribe(result => {
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
