import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {DiscordService} from "../discord.service";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GuildSelectedGuard implements CanActivate {

  constructor(private discord: DiscordService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.paramMap.get('guild');
    return this.discord.getGuild(id).pipe(
      map(guild => {
        return !!guild;
      }), catchError(() => {
        alert('Failed to load page, please try again');
        this.router.navigate(['selector']);
        return of(false);
      })
    );
  }

}
