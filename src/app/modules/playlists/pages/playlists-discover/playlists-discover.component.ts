import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {PlayListSummary} from "../../../../entities/play-list-summary";

@Component({
  selector: 'app-playlists-discover',
  templateUrl: './playlists-discover.component.html',
  styleUrls: ['./playlists-discover.component.css']
})
export class PlaylistsDiscoverComponent implements OnInit {

  loading = true;
  lists: PlayListSummary[] = [];

  constructor(private service: PlaylistService) {
  }

  ngOnInit(): void {
    this.loadPage('0');
  }

  loadPage(cursor: string): void {
    this.loading = true;
    this.service.discover(cursor).subscribe(items => {
      items.forEach(item => this.lists.push(item));
      this.loading = false;
    }, () => {
      // error?
      this.loading = false;
    });
  }

}
