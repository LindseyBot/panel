import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  login(token: string) {
    // send token to backend
    // return jwt with userId
    localStorage.setItem('Discord', token);
  }

  isLoggedIn(): boolean {
    return false;
  }

  logout(): void {
    // delete jwt
    localStorage.setItem('Discord', null);
  }

}
