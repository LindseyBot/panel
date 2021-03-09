import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormGroup, NgModel} from "@angular/forms";
import {NzSelectOptionInterface} from "ng-zorro-antd/select";

@Component({
  selector: 'shared-settings-select',
  templateUrl: './settings-select.component.html',
  styleUrls: ['./settings-select.component.css']
})
export class SettingsSelectComponent implements OnInit {

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
  options: NzSelectOptionInterface[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
