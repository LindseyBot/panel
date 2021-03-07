import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../modules/auth/entities/user";
import {AuthService} from "../../services/auth.service";
import {ThemeService} from "../../services/theme.service";
import {ActivatedRoute, Event, NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Guild} from "../../entities/guild";
import {DiscordService} from "../../services/discord.service";

@Component({
  selector: 'app-server-sidebar-layout',
  templateUrl: './server-sidebar-layout.component.html',
  styleUrls: ['./server-sidebar-layout.component.css']
})
export class ServerSidebarLayoutComponent implements OnInit, OnDestroy {

  user: User;
  isCollapsed = false;
  listener: Subscription;

  guildId: string;
  guild: Guild;

  constructor(private discord: DiscordService, private authService: AuthService,
              private themeService: ThemeService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.onRouteUpdate(new NavigationEnd(0, this.router.url, ''));
    this.listener = this.router.events.subscribe((event) => this.onRouteUpdate(event));
    this.authService.getUser().subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }

  onRouteUpdate(event: Event): void {
    if (!(event instanceof NavigationEnd)) {
      return;
    }
    const id = this.getGuildId(event.url);
    if (this.guildId !== id) {
      console.log('[+] Detected guild update: ' + this.guildId + ' to ' + id);
      this.guildId = id;
      this.discord.getGuild(this.guildId).subscribe(guild => this.guild = guild);
    }
  }

  getGuildId(url: string): string {
    const match = url.match('panel\\/(\\d+)\\/');
    if (!match) {
      return null;
    }
    return match[1];
  }

}
