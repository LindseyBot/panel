import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LeaderboardEntry} from "../../../../entities/leaderboard-entry";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {LeaderboardService} from "../../services/leaderboard.service";

@Component({
  selector: 'app-cookies-leaderboard',
  templateUrl: './cookies-leaderboard.component.html',
  styleUrls: ['./cookies-leaderboard.component.css']
})
export class CookiesLeaderboardComponent implements OnInit {

  loading: boolean = true;
  data: LeaderboardEntry[];

  index: number = 0;
  oldIndex: number = 0;

  beforeLast: string = '0';
  last: string = '0';

  total: number = 100;

  constructor(private http: HttpClient, private service: LeaderboardService) {
  }

  ngOnInit(): void {

  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageIndex} = params;
    let increasing = false;
    if (pageIndex > this.oldIndex) {
      increasing = true;
    }
    let next = (increasing) ? this.last : this.beforeLast;
    this.service.fetch('COOKIES', next).subscribe(data => {
      this.data = data.items;
      this.total = data.last ? data.items.length : 101;
      this.beforeLast = this.last;
      this.last = data.items[data.items.length - 1].id;
      this.oldIndex = pageIndex;
      this.loading = false;
    });
  }

}
