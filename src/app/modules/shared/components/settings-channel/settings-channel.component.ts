import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormGroup, NgModel} from "@angular/forms";
import {NzSelectOptionInterface} from "ng-zorro-antd/select";
import {Guild} from "../../../../entities/guild";

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
  disabled: boolean = false;

  @Input()
  required: boolean = true;

  @Input()
  loading: boolean = false;

  @Input()
  nzErrorTip?: string | TemplateRef<{
    $implicit: AbstractControl | NgModel;
  }>;

  @Input()
  notes?: string | TemplateRef<{
    $implicit: AbstractControl | NgModel;
  }>;

  @Input()
  guild: Guild;

  @Input()
  filter: string = 'TEXT';

  options: NzSelectOptionInterface[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
