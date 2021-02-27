import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {StateService} from "../../../../services/state.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageRef, NzMessageService} from "ng-zorro-antd/message";
import {FormService} from "../../../../services/form.service";
import {NzSelectOptionInterface} from "ng-zorro-antd/select";

@Component({
  selector: 'settings-core',
  templateUrl: './settings-core.component.html',
  styleUrls: ['./settings-core.component.css']
})
export class SettingsCoreComponent implements OnInit, OnDestroy {

  form: FormGroup;
  changesDetected: boolean = false;
  loaded: boolean = false;

  @ViewChild('unsaved')
  unsavedRef: TemplateRef<any>;
  unsavedMsgRef: NzMessageRef;

  // ------------------------------------------------------------------------

  languages: NzSelectOptionInterface[] = [
    {
      value: 'en_US',
      label: 'English (US)',
    }
  ];

  constructor(private state: StateService, private formBuilder: FormBuilder, private nzMessage: NzMessageService, private formService: FormService) {
    this.form = this.formBuilder.group({
      prefix: ['', [Validators.required]],
      language: ['', [Validators.required]],
      keepRoles: ['', [Validators.required]]
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
