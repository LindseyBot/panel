import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {ServerProfile} from "../../../entities/server-profile";
import {MusicSettings} from "../../../entities/music-settings";
import {StarboardSettings} from "../../../entities/starboard-settings";

@Injectable({
  providedIn: 'root'
})
export class ServerSettingsService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  fetchSettings(guild: string): Observable<ServerProfile> {
    return this.http.get<ServerProfile>(environment.API_URL + '/guilds/' + guild + '/settings',
      {headers: this.authService.getHeaders()});
  }

  putSettings(guild: string, profile: ServerProfile): Observable<ServerProfile> {
    return this.http.put<ServerProfile>(environment.API_URL + '/guilds/' + guild + '/settings', profile,
      {headers: this.authService.getHeaders()});
  }

  fetchMusic(guild: string): Observable<MusicSettings> {
    return this.http.get<MusicSettings>(environment.API_URL + '/guilds/' + guild + '/music',
      {headers: this.authService.getHeaders()});
  }

  putMusic(guild: string, settings: MusicSettings): Observable<MusicSettings> {
    return this.http.put<MusicSettings>(environment.API_URL + '/guilds/' + guild + '/music', settings,
      {headers: this.authService.getHeaders()});
  }

  fetchStarboard(guild: string): Observable<StarboardSettings> {
    return this.http.get<StarboardSettings>(environment.API_URL + '/guilds/' + guild + '/starboard',
      {headers: this.authService.getHeaders()});
  }

  putStarboard(guild: string, settings: StarboardSettings): Observable<StarboardSettings> {
    return this.http.put<StarboardSettings>(environment.API_URL + '/guilds/' + guild + '/starboard', settings,
      {headers: this.authService.getHeaders()});
  }

}
