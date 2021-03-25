import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistService} from "../../services/playlist.service";
import {PlayList} from "../../../../entities/play-list";
import {Track} from "../../../../entities/track";

@Component({
  selector: 'app-playlists-detail',
  templateUrl: './playlists-detail.component.html',
  styleUrls: ['./playlists-detail.component.css']
})
export class PlaylistsDetailComponent implements OnInit {

  playList: PlayList;
  tracks: Track[];
  loading = true;

  constructor(private route: ActivatedRoute, private service: PlaylistService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.findById(id).subscribe(playlist => {
      console.log(playlist);
      this.playList = playlist;
      this.service.fetchTracks(playlist.id).subscribe(tracks => {
        this.tracks = tracks;
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    }, () => {
      this.loading = false;
    });
  }

}
