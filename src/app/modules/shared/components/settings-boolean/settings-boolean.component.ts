import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormGroup, NgModel} from "@angular/forms";

@Component({
  selector: 'shared-settings-boolean',
  templateUrl: './settings-boolean.component.html',
  styleUrls: ['./settings-boolean.component.css']
})
export class SettingsBooleanComponent implements OnInit {

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
  rawNotes?: string | TemplateRef<{
    $implicit: AbstractControl | NgModel;
  }>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
