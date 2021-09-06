import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormGroup, NgModel} from '@angular/forms';
import {Guild} from '../../../../entities/guild';
import {NzSelectModeType} from 'ng-zorro-antd/select';

@Component({
  selector: 'shared-settings-channel',
  templateUrl: './settings-channel.component.html',
  styleUrls: ['./settings-channel.component.css']
})
export class SettingsChannelComponent implements OnInit {

  @Input()
  formGroup: FormGroup;

  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  notes: string;

  @Input()
  nzRequired: boolean = true;

  @Input()
  nzErrorTip?: string | TemplateRef<{
    $implicit: AbstractControl | NgModel;
  }>;

  @Input()
  mode: NzSelectModeType = 'default';

  @Input()
  guild: Guild;

  @Input()
  filter: string = 'TEXT';

  constructor() {
  }

  ngOnInit(): void {
  }

}
