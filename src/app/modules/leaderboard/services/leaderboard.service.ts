import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {LeaderBoardResponse} from "../../../entities/leader-board-response";

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private http: HttpClient) {
  }

  fetch(type: string, page: number): Observable<LeaderBoardResponse> {
    return this.http.get<LeaderBoardResponse>(environment.API_URL + '/leaderboards?type=' + type + '&page=' + page);
  }

}
