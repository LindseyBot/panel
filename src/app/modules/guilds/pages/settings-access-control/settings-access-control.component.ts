import {Component, OnInit} from '@angular/core';
import {StateService} from "../../../../services/state.service";
import {AccessControlService} from "../../services/access-control.service";
import {AccessCredentials} from "../../../../entities/access-credentials";
import {AuthService} from "../../../../services/auth.service";
import {ModalService} from "../../../../services/modal.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-settings-access-control',
  templateUrl: './settings-access-control.component.html',
  styleUrls: ['./settings-access-control.component.css']
})
export class SettingsAccessControlComponent implements OnInit {

  loaded: boolean = false;

  credentials: AccessCredentials[];
  userId: string;

  constructor(private state: StateService, private service: AccessControlService,
              private authService: AuthService, private modal: ModalService,
              private nzNotifications: NzNotificationService) {
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => this.userId = user.id);
    this.load();
  }

  load(): void {
    this.loaded = false;
    this.service.getAccess(this.state.guildId).subscribe((credentials) => {
      this.loaded = true;
      this.credentials = credentials;
    });
  }

  addUser(): void {
    this.modal.createUser('Authorize user').afterClose.subscribe((res) => {
      if (!res) {
        return;
      }
      this.service.create(this.state.guildId, res).subscribe((_) => {
        this.nzNotifications.success('SUCCESS', _.username + ' added successfully', {
          nzDuration: 5000
        });
        this.load();
      }, (_) => {
        this.nzNotifications.error('Failed to add user', _.error.message, {
          nzDuration: 5000
        });
      });
    });
  }

  delete(id: string): void {
    this.loaded = false;
    this.service.delete(this.state.guildId, id).subscribe((_) => {
      this.nzNotifications.success('SUCCESS', 'User removed successfully', {
        nzDuration: 5000
      });
      this.load();
    }, (_) => {
      this.loaded = true;
      this.nzNotifications.error('Failed to remove user', _.error.message, {
        nzDuration: 5000
      });
    })
  }

}
