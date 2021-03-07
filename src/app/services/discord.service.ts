import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Guild} from "../entities/guild";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DiscordService {

  cache: Map<string, Guild> = new Map<string, Guild>();

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getGuilds(): any {
    return [
      {
        'id': '213044545825406976',
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

  getGuild(guildId: string): Observable<Guild> {
    if (this.cache.has(guildId)) {
      return of(this.cache.get(guildId));
    }
    return this.http.get<Guild>(environment.API_URL + '/guilds/' + guildId, {headers: this.authService.getHeaders()})
      .pipe(tap((guild) => this.cache.set(guild.id, guild)));
  }

}
