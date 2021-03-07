import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageRef, NzMessageService} from "ng-zorro-antd/message";
import {FormService} from "../../../../services/form.service";

@Component({
  selector: 'app-settings-logging',
  templateUrl: './settings-logging.component.html',
  styleUrls: ['./settings-logging.component.css']
})
export class SettingsLoggingComponent implements OnInit, OnDestroy {

  form: FormGroup;
  changesDetected: boolean = false;
  loaded: boolean = false;

  @ViewChild('unsaved')
  unsavedRef: TemplateRef<any>;
  unsavedMsgRef: NzMessageRef;

  constructor(private formBuilder: FormBuilder, private nzMessage: NzMessageService, private formService: FormService) {
    this.form = this.formBuilder.group({
      welcomeEnabled: ['', [Validators.required]],
      welcomeDM: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loaded = true;
    this.form.patchValue({'prefix': 'L!'});
    this.form.patchValue({'language': 'en_US'});
    this.form.patchValue({'keepRoles': 'false'});

    // Listen to changes
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
  }

}
