import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormGroup, NgModel} from "@angular/forms";

@Component({
  selector: 'shared-settings-slider',
  templateUrl: './settings-slider.component.html',
  styleUrls: ['./settings-slider.component.css']
})
export class SettingsSliderComponent implements OnInit {

  @Input()
  formGroup: FormGroup;

  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  nzErrorTip?: string | TemplateRef<{
    $implicit: AbstractControl | NgModel;
  }>;

  @Input()
  min: number;

  @Input()
  max: number;

  @Input()
  notes?: string | TemplateRef<{
    $implicit: AbstractControl | NgModel;
  }>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
