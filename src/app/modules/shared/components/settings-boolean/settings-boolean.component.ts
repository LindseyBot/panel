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
    required: boolean = true;

    @Input()
    loading: boolean = false;

    @Input()
    disabled: boolean = false;

    @Input()
    nzErrorTip?: string | TemplateRef<{
        $implicit: AbstractControl | NgModel;
    }>;

    @Input()
    notes?: string | TemplateRef<{
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
