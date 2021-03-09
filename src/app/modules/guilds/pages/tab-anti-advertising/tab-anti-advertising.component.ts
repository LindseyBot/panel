import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AutoModService} from "../../services/auto-mod.service";
import {Guild} from "../../../../entities/guild";
import {FormService} from "../../../../services/form.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'tab-anti-advertising',
  templateUrl: './tab-anti-advertising.component.html',
  styleUrls: ['./tab-anti-advertising.component.css']
})
export class TabAntiAdvertisingComponent implements OnInit {

  form: FormGroup;
  changesDetected: boolean = false;
  loading: boolean = true;

  @Input()
  guild: Guild;

  constructor(private formBuilder: FormBuilder, private formService: FormService,
              private service: AutoModService, private nzNotifications: NzNotificationService) {
    this.form = this.formBuilder.group({
      enabled: ['', [Validators.required]],
      strikes: ['', [Validators.max(10), Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.service.fetchAntiAd(this.guild.id).subscribe(antiad => {
      this.loading = false;
      this.form.reset(antiad);
      this.changesDetected = false;
    });
    // Listen to changes
    this.form.valueChanges.subscribe(() => {
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
    this.service.saveAntiAd(this.guild.id, this.form.getRawValue()).subscribe(result => {
      this.loading = false;
      this.form.reset(result);
      this.changesDetected = false;
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
