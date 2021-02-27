import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'tab-anti-advertising',
  templateUrl: './tab-anti-advertising.component.html',
  styleUrls: ['./tab-anti-advertising.component.css']
})
export class TabAntiAdvertisingComponent implements OnInit {

  @Input()
  form: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

}
