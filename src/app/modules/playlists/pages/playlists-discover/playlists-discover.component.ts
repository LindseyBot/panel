import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {PlayList} from "../../../../entities/play-list";
import {Page} from "../../../../entities/page";

@Component({
  selector: 'app-playlists-discover',
  templateUrl: './playlists-discover.component.html',
  styleUrls: ['./playlists-discover.component.css']
})
export class PlaylistsDiscoverComponent implements OnInit {

  loading = true;
  lists: Page<PlayList> = new Page<PlayList>(0);

  cursorForward: string = '0';
  cursorBackward: string = '0';

  lastDir: string;
  hasMorePages = true;

  constructor(private service: PlaylistService) {
  }

  ngOnInit(): void {
    this.loadPage(this.cursorForward, 'asc', true);
  }

  loadPage(cursor: string, dir: string, firstLoad?: boolean): void {
    this.loading = true;
    this.service.discover(cursor, dir).subscribe(items => {
      this.lists = items;
      this.loading = false;
      this.hasMorePages = !items.last;
      if (items.items.length > 0) {
        this.cursorForward = items.items[items.items.length - 1].id;
        this.cursorBackward = items.items[0].id;
      }
      if (firstLoad) {
        this.lastDir = 'desc';
        this.hasMorePages = false;
      } else {
        this.lastDir = dir;
      }
    }, () => {
      // error?
      this.hasMorePages = true;
      this.loading = false;
    });
  }

}
