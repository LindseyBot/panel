import {Component, Input, OnInit} from '@angular/core';
import {Track} from "../../../../entities/track";

@Component({
  selector: 'shared-playlist-track',
  templateUrl: './playlist-track.component.html',
  styleUrls: ['./playlist-track.component.css']
})
export class PlaylistTrackComponent implements OnInit {

  @Input()
  track: Track;

  url: string;
  duration: string;

  constructor() {
  }

  ngOnInit(): void {
    if (this.track.source === 'Youtube') {
      this.url = 'https://youtube.com/watch?v=' + this.track.code;
    } else if (this.track.source === 'SoundCloud') {
      this.url = 'https://soundcloud.com/' + this.track.code;
    }
    this.duration = this.humanReadableDuration(this.track.duration);
  }

  humanReadableDuration(msDuration: number): string {
    const h = Math.floor(msDuration / 1000 / 60 / 60);
    const m = Math.floor((msDuration / 1000 / 60 / 60 - h) * 60);
    const s = Math.floor(((msDuration / 1000 / 60 / 60 - h) * 60 - m) * 60);

    // To get time format 00:00:00
    const seconds: string = s < 10 ? `0${s}` : `${s}`;
    const minutes: string = m < 10 ? `0${m}` : `${m}`;
    const hours: string = h < 10 ? `0${h}` : `${h}`;

    if (h < 1 && m < 1) {
      return `${seconds}s`;
    } else if (h < 1) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
  }

}
