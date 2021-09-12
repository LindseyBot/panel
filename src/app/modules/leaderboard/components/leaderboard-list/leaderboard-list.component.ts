import {Component, Input, OnInit} from '@angular/core';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {HttpClient} from '@angular/common/http';
import {LeaderboardService} from '../../services/leaderboard.service';
import {LeaderboardEntry} from '../../../../entities/leaderboard-entry';

@Component({
  selector: 'app-leaderboard-list',
  templateUrl: './leaderboard-list.component.html',
  styleUrls: ['./leaderboard-list.component.css']
})
export class LeaderboardListComponent implements OnInit {

  loading = true;
  data: LeaderboardEntry[];

  total = 100;
  page = 0;
  size = 10;

  @Input()
  type: string;

  constructor(private http: HttpClient, private service: LeaderboardService) {
  }

  ngOnInit(): void {
    this.onQueryParamsChange({
      pageIndex: 1,
      pageSize: 10,
      sort: [],
      filter: []
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageIndex} = params;
    this.page = pageIndex - 1;
    this.service.fetch(this.type, this.page, this.size).subscribe(data => {
      this.data = data.items;
      this.total = data.total;
      this.loading = false;
    }, (_) => {
      this.loading = false;
    });
  }

}
