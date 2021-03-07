import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageRef, NzMessageService} from 'ng-zorro-antd/message';
import {FormService} from '../../../../services/form.service';
import {NzSelectOptionInterface} from 'ng-zorro-antd/select';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  form: FormGroup;
  changesDetected = false;
  loaded = false;

  @ViewChild('unsaved')
  unsavedRef: TemplateRef<any>;
  unsavedMsgRef: NzMessageRef;

  languages: NzSelectOptionInterface[] = [
    {
      value: 'en_US',
      label: 'English (US)',
    }
  ];

  countries: NzSelectOptionInterface[] = [
    {
      value: 'Brazil',
      label: 'Brazil',
    }, {
      value: 'USA',
      label: 'United States of America',
    }
  ];

  badges = [
    {
      url: 'https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg'
    }, {
      url: 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg'
    }
  ];

  constructor(private formBuilder: FormBuilder, private nzMessage: NzMessageService, private formService: FormService) {
    this.form = this.formBuilder.group({
      language: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loaded = true;
    this.form.patchValue({language: 'en_US'});
    this.form.patchValue({country: 'USA'});

    this.form.valueChanges.subscribe(() => {
      if (!this.changesDetected) {
        this.changesDetected = true;
        this.unsavedMsgRef = this.nzMessage.warning(this.unsavedRef, {nzDuration: 0});
      }
    });
  }

  ngOnDestroy(): void {
    if (this.changesDetected) {
      this.nzMessage.remove(this.unsavedMsgRef.messageId);
    }
  }

  save(): void {
    const valid = this.formService.check(this.form);
    if (!valid) {
      return;
    }
  }
}
