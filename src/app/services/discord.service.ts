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

  getGuilds(): Observable<Guild[]> {
    return this.http.get<Guild[]>(environment.API_URL + '/guilds', {headers: this.authService.getHeaders()})
      .pipe(tap((guilds) => {
        for (let guild of guilds) {
          this.cache.set(guild.id, guild);
        }
      }));
  }

  getGuild(guildId: string): Observable<Guild> {
    if (this.cache.has(guildId)) {
      return of(this.cache.get(guildId));
    }
    return this.http.get<Guild>(environment.API_URL + '/guilds/' + guildId, {headers: this.authService.getHeaders()})
      .pipe(tap((guild) => this.cache.set(guild.id, guild)));
  }

}
