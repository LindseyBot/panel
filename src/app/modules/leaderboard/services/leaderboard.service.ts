import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Page} from '../../../entities/page';
import {LeaderboardEntry} from '../../../entities/leaderboard-entry';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private http: HttpClient) {
  }

  fetch(type: string, page: number, limit: number): Observable<Page<LeaderboardEntry>> {
    return this.http.get<Page<LeaderboardEntry>>(environment.API_URL + '/leaderboards?type=' + type + '&page=' + page + '&limit=' + limit);
  }

}
