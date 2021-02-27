import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StateService} from "../state.service";

@Injectable({
  providedIn: 'root'
})
export class GuildSelectedGuard implements CanActivate {

  constructor(private state: StateService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let canAccess = this.state.guildId !== null && this.state.guildId !== undefined;
    if (canAccess) {
      return true;
    } else {
      this.router.navigate(['guilds']);
      return false;
    }
  }

}
