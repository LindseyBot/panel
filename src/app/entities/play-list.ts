import {User} from "../modules/auth/entities/user";

export class PlayList {

  id: string;
  owner: string;
  user: User;
  name: string;
  shuffle: boolean;
  logoUrl: string;
  security: string;

}
