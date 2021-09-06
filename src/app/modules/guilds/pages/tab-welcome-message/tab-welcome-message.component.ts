import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'tab-welcome-message',
  templateUrl: './tab-welcome-message.component.html',
  styleUrls: ['./tab-welcome-message.component.css']
})
export class TabWelcomeMessageComponent implements OnInit {

  @Input()
  form: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

}
