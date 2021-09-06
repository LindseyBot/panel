import {Component, Input, OnInit} from '@angular/core';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {HttpClient} from '@angular/common/http';
import {LeaderboardService} from '../../services/leaderboard.service';
import {LeaderboardEntry} from '../../../../entities/leaderboard-entry';

@Component({
  selector: 'leaderboard-list',
  templateUrl: './leaderboard-list.component.html',
  styleUrls: ['./leaderboard-list.component.css']
})
export class LeaderboardListComponent implements OnInit {

  loading: boolean = true;
  data: LeaderboardEntry[];

  total: number = 100;
  page: number = 0;
  size: number = 15;

  @Input()
  type: string;

  constructor(private http: HttpClient, private service: LeaderboardService) {
  }

  ngOnInit(): void {
    this.onQueryParamsChange({
      pageIndex: 1,
      pageSize: 15,
      sort: [],
      filter: []
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageIndex} = params;
    this.page = pageIndex - 1;
    this.service.fetch(this.type, this.page).subscribe(data => {
      this.data = data.items;
      this.total = data.last ? data.items.length : 101;
      this.loading = false;
    }, (_) => {
      this.loading = false;
    });
  }

}
