import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Guild} from "../../../../../../entities/guild";
import {FormService} from "../../../../../../services/form.service";
import {ServerSettingsService} from "../../../../services/server-settings.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {skipWhile} from "rxjs/operators";

@Component({
  selector: 'automod-main',
  templateUrl: './tab-automod.component.html',
  styleUrls: ['./tab-automod.component.css']
})
export class TabAutomodComponent implements OnInit {

  form: FormGroup;
  changesDetected: boolean = false;
  loading: boolean = true;

  @Input()
  guild: Guild;

  constructor(private formBuilder: FormBuilder, private formService: FormService,
              private service: ServerSettingsService, private nzNotifications: NzNotificationService) {
    this.form = this.formBuilder.group({
      muteEnabled: new FormControl(null, [
        Validators.required
      ]),
      banEnabled: new FormControl(null, [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
    this.service.fetchAutomod(this.guild.id).subscribe(settings => {
      this.form.reset(settings);
      this.loading = false;
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
    this.service.putAutomod(this.guild.id, this.form.getRawValue()).subscribe(result => {
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
