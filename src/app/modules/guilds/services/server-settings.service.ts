import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {ServerProfile} from "../../../entities/server-profile";

@Injectable({
  providedIn: 'root'
})
export class ServerSettingsService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  fetch(guild: string): Observable<ServerProfile> {
    return this.http.get<ServerProfile>(environment.API_URL + '/guilds/'
      + guild + '/settings', {headers: this.authService.getHeaders()});
  }

  put(guild: string, profile: string): Observable<ServerProfile> {
    return this.http.put<ServerProfile>(environment.API_URL + '/guilds/' + guild + '/settings', profile,
      {headers: this.authService.getHeaders()});
  }

}
