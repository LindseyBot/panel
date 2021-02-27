import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public guildId: string = null;

  constructor() {
    if (localStorage.getItem('Guild') !== null) {
      this.guildId = localStorage.getItem('Guild');
    }
  }

  setGuild(id: string) {
    this.guildId = id;
    localStorage.setItem('Guild', id);
  }

}
