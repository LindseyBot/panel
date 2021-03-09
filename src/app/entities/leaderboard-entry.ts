import {User} from "../modules/auth/entities/user";

export class LeaderboardEntry {

  id: string;
  user: User;

  count: number;
  type: string;

}
