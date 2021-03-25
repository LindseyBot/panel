import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistService} from "../../services/playlist.service";
import {PlayList} from "../../../../entities/play-list";
import {Track} from "../../../../entities/track";
import {VoteSummary} from "../../../../entities/vote-summary";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-playlists-detail',
  templateUrl: './playlists-detail.component.html',
  styleUrls: ['./playlists-detail.component.css']
})
export class PlaylistsDetailComponent implements OnInit {

  playList: PlayList;
  tracks: Track[] = [];
  votes: VoteSummary;
  loading = true;

  // 0 = Loading | 1 = Loaded
  songStatus: number = 0;

  // 0 = Loading | 1 = Loaded | 2 = Updating
  voteStatus: number = 0;

  constructor(private route: ActivatedRoute, private service: PlaylistService,
              private nzNotifications: NzNotificationService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.findById(id).subscribe(playlist => {
      this.playList = playlist;
      this.loading = false;
      this.service.fetchTracks(playlist.id).subscribe(tracks => {
        this.tracks = tracks;
        this.songStatus = 1;
      });
      this.service.fetchVotes(playlist.id).subscribe(votes => {
        this.votes = votes;
        this.voteStatus = 1;
      });
    }, () => {
      this.loading = false;
    });
  }

  vote(isUpvote: boolean): void {
    let vote;
    if (isUpvote === this.votes.voted) {
      vote = null;
    } else {
      vote = isUpvote;
    }
    if (this.voteStatus == 0 || this.voteStatus == 2) {
      return;
    }
    this.voteStatus = 2;
    this.service.vote(this.playList.id, vote).subscribe((result) => {
      this.votes = result;
      this.voteStatus = 1;
    }, (_) => {
      this.nzNotifications.error('Failed to update vote', _.error.message, {
        nzDuration: 5000
      });
      this.voteStatus = 1;
    });
  }

}
