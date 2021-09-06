import {Injectable} from '@angular/core';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {ModalUserReferenceComponent} from '../modules/shared/components/modal-user-reference/modal-user-reference.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private nzModalService: NzModalService) {
  }

  createUser(title: string): NzModalRef<ModalUserReferenceComponent> {
    return this.nzModalService.create({
      nzTitle: title,
      nzContent: ModalUserReferenceComponent,
      nzFooter: null
    });
  }

}
