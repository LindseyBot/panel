import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServerProfile} from "../../../../entities/server-profile";
import {StateService} from "../../../../services/state.service";
import {GuildSettingsService} from "../../../../services/guild-settings.service";
import {NzMessageRef, NzMessageService} from "ng-zorro-antd/message";
import {FormService} from "../../../../services/form.service";

@Component({
  selector: 'settings-automod',
  templateUrl: './settings-automod.component.html',
  styleUrls: ['./settings-automod.component.css']
})
export class SettingsAutomodComponent implements OnInit, OnDestroy {

  form: FormGroup;
  changesDetected: boolean = false;
  loaded: boolean = false;

  @ViewChild('unsaved')
  unsavedRef: TemplateRef<any>;
  unsavedMsgRef: NzMessageRef;

  profile: ServerProfile;

  constructor(private state: StateService, private formBuilder: FormBuilder,
              private guildSettings: GuildSettingsService, private nzMessage: NzMessageService,
              private formService: FormService) {
    this.form = this.formBuilder.group({
      adEnabled: ['', [Validators.required]],
      adStrikes: ['', [Validators.required, Validators.max(10), Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.guildSettings.getProfile(this.state.guildId).subscribe((profile) => {
      this.profile = profile;
      this.loaded = true;
    });
    this.form.valueChanges.subscribe(() => {
      if (!this.changesDetected) {
        this.changesDetected = true;
        this.unsavedMsgRef = this.nzMessage.warning(this.unsavedRef, {nzDuration: 0});
      }
    })
  }

  ngOnDestroy(): void {
    if (this.changesDetected) {
      this.nzMessage.remove(this.unsavedMsgRef.messageId);
    }
  }

  save(): void {
    let valid = this.formService.check(this.form);
    if (!valid) {
      return;
    }
    // TODO: Save logic
  }

}
