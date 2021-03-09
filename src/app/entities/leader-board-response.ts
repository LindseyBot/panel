import {LeaderboardEntry} from "./leaderboard-entry";

export class LeaderBoardResponse {

  page: number;
  limit: number;
  last: boolean;
  items: LeaderboardEntry[];

}
