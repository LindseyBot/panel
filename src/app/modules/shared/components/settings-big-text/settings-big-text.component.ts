import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormGroup, NgModel} from '@angular/forms';

@Component({
  selector: 'shared-settings-big-text',
  templateUrl: './settings-big-text.component.html',
  styleUrls: ['./settings-big-text.component.css']
})
export class SettingsBigTextComponent implements OnInit {

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
  placeholder: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
