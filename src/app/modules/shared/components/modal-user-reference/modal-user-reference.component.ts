import {Component, OnInit} from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-modal-user-reference',
  templateUrl: './modal-user-reference.component.html',
  styleUrls: ['./modal-user-reference.component.css']
})
export class ModalUserReferenceComponent implements OnInit {

  token: string;

  constructor(private _modal: NzModalRef) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this._modal.destroy(this.token);
  }

}
