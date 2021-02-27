import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormGroup, NgModel} from "@angular/forms";

@Component({
  selector: 'shared-settings-small-text',
  templateUrl: './settings-small-text.component.html',
  styleUrls: ['./settings-small-text.component.css']
})
export class SettingsSmallTextComponent implements OnInit {

  @Input()
  formGroup: FormGroup;

  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  placeholder: string;

  @Input()
  nzErrorTip?: string | TemplateRef<{
    $implicit: AbstractControl | NgModel;
  }>;

  @Input()
  notes?: string | TemplateRef<{
    $implicit: AbstractControl | NgModel;
  }>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
