import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {PlayList} from "../../../entities/play-list";
import {Page} from "../../../entities/page";
import {map} from "rxjs/operators";
import {Track} from "../../../entities/track";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  discover(cursor: string, dir: string): Observable<Page<PlayList>> {
    return this.http.get<Page<PlayList>>(environment.API_URL + '/playlists?limit=15&cursor=' + cursor + '&dir=' + dir,
      {headers: this.authService.getHeaders()});
  }

  findById(id: string): Observable<PlayList> {
    return this.http.get<PlayList>(environment.API_URL + '/playlists/' + id, {headers: this.authService.getHeaders()});
  }

  findSelf(): Observable<PlayList[]> {
    return this.http.get<Page<PlayList>>(environment.API_URL + '/playlists/@me',
      {headers: this.authService.getHeaders()}).pipe(map(a => a.items));
  }

  fetchTracks(playlist: string): Observable<Track[]> {
    return this.http.get<Track[]>(environment.API_URL + '/playlists/' + playlist + '/tracks',
      {headers: this.authService.getHeaders()});
  }

}
