import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Guild} from "../entities/guild";

@Injectable({
  providedIn: 'root'
})
export class DiscordService {

  constructor() {
  }

  getGuilds(): any {
    return [
      {
        'id': '1111111111111111',
        'name': 'aaaaa'
      },
      {
        'id': '2222222222222222',
        'name': 'bbbbb'
      },
      {
        'id': '3333333333333333',
        'name': 'ccccc'
      },
      {
        'id': '4444444444444444',
        'name': 'ddddd'
      },
      {
        'id': '5555555555555555',
        'name': 'eeeee'
      }
    ];
  }

  getTextChannels(guild: string): any {
    return [
      {
        'id': '1111111111111111',
        'name': 'text1'
      },
      {
        'id': '2222222222222222',
        'name': 'text2'
      },
      {
        'id': '3333333333333333',
        'name': 'text3'
      },
      {
        'id': '4444444444444444',
        'name': 'text4'
      },
      {
        'id': '5555555555555555',
        'name': 'text5'
      }
    ];
  }

  getGuild(guildId: string): Observable<Guild> {
    return of({
      id: '123123123123123',
      name: 'Imperio Fabricio20'
    });
  }

}
