import {Injectable} from '@angular/core';
import {ServerProfile} from "../entities/server-profile";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GuildSettingsService {

  constructor() {
  }

  getProfile(guildId: string): Observable<ServerProfile> {
    return of({
      prefix: '!'
    });
  }

}
