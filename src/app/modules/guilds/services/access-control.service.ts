import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../services/auth.service';
import {environment} from '../../../../environments/environment';
import {AccessCredentials} from '../../../entities/access-credentials';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAccess(guild: string): Observable<AccessCredentials[]> {
    return this.http.get<AccessCredentials[]>(environment.API_URL + '/guilds/'
      + guild + '/access', {headers: this.authService.getHeaders()});
  }

  create(guild: string, ticket: string): Observable<any> {
    return this.http.post(environment.API_URL + '/guilds/' + guild + '/access', {
      ticket: ticket
    }, {headers: this.authService.getHeaders()});
  }

  delete(guild: string, id: string): Observable<any> {
    return this.http.delete(environment.API_URL + '/guilds/' + guild + '/access/' + id,
      {headers: this.authService.getHeaders()});
  }

}
