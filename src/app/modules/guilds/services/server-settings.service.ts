import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../services/auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ServerProfile} from '../../../entities/server-profile';
import {StarboardSettings} from '../../../entities/starboard-settings';
import {EmbedSettings} from '../../../entities/embed-settings';
import {Antiad} from '../../../entities/antiad';
import {Automod} from '../../../entities/automod';

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

  fetchStarboard(guild: string): Observable<StarboardSettings> {
    return this.http.get<StarboardSettings>(environment.API_URL + '/guilds/' + guild + '/starboard',
      {headers: this.authService.getHeaders()});
  }

  putStarboard(guild: string, settings: StarboardSettings): Observable<StarboardSettings> {
    return this.http.put<StarboardSettings>(environment.API_URL + '/guilds/' + guild + '/starboard', settings,
      {headers: this.authService.getHeaders()});
  }

  fetchEmbeds(guild: string): Observable<EmbedSettings> {
    return this.http.get<EmbedSettings>(environment.API_URL + '/guilds/' + guild + '/embeds',
      {headers: this.authService.getHeaders()});
  }

  putEmbeds(guild: string, settings: EmbedSettings): Observable<EmbedSettings> {
    return this.http.put<EmbedSettings>(environment.API_URL + '/guilds/' + guild + '/embeds', settings,
      {headers: this.authService.getHeaders()});
  }

  fetchAntiAd(guild: string): Observable<Antiad> {
    return this.http.get<Antiad>(environment.API_URL + '/guilds/' + guild + '/antiad',
      {headers: this.authService.getHeaders()});
  }

  putAntiAd(guild: string, settings: Antiad): Observable<Antiad> {
    return this.http.put<Antiad>(environment.API_URL + '/guilds/' + guild + '/antiad', settings,
      {headers: this.authService.getHeaders()});
  }

  fetchAutomod(guild: string): Observable<Automod> {
    return this.http.get<Automod>(environment.API_URL + '/guilds/' + guild + '/automod',
      {headers: this.authService.getHeaders()});
  }

  putAutomod(guild: string, settings: Automod): Observable<Automod> {
    return this.http.put<Automod>(environment.API_URL + '/guilds/' + guild + '/automod', settings,
      {headers: this.authService.getHeaders()});
  }

}
