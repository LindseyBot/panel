import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../services/auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Page} from '../../../../entities/page';
import {AuditMessage} from '../../../../entities/audit-message';

@Injectable({
  providedIn: 'root'
})
export class GuildLogsService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  fetch(guild: string, page: number): Observable<Page<AuditMessage>> {
    return this.http.get<Page<AuditMessage>>(environment.API_URL + '/guilds/' + guild + '/logs?page=' + page,
      {headers: this.authService.getHeaders()});
  }

}
