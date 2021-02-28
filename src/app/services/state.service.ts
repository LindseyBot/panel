import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public guildId: string = null;

  constructor() {
    if (localStorage.getItem('SelectedServer') !== null) {
      this.guildId = localStorage.getItem('SelectedServer');
    }
  }

  setGuild(id: string) {
    this.guildId = id;
    localStorage.setItem('SelectedServer', id);
  }

}
