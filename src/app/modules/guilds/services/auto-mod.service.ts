import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../services/auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Antiad} from '../../../entities/antiad';

@Injectable({
  providedIn: 'root'
})
export class AutoModService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  fetchAntiAd(guild: string): Observable<Antiad> {
    return this.http.get<Antiad>(environment.API_URL + '/guilds/'
      + guild + '/antiad', {headers: this.authService.getHeaders()});
  }

  saveAntiAd(guild: string, antiad: Antiad): Observable<Antiad> {
    return this.http.put<Antiad>(environment.API_URL + '/guilds/' + guild + '/antiad', antiad,
      {headers: this.authService.getHeaders()});
  }

}
