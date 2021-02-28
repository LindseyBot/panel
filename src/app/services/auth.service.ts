import {Injectable} from '@angular/core';
import {User} from "../modules/auth/entities/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Token} from "../modules/auth/entities/token";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(private http: HttpClient) {
  }

  /**
   * Returns the token used for authorizing requests.
   */
  protected getToken(): string {
    return localStorage.getItem('Token');
  }

  /**
   * Saves the new token.
   * @param token - Token
   */
  protected setToken(token: string): void {
    localStorage.setItem('Token', token);
  }

  /**
   * Authenticates the user with the backend, discarding Discord's token.
   *
   * @param token - Discord's token.
   */
  login(token: string): Observable<Token> {
    localStorage.setItem('Discord', token);
    return this.http.post<Token>(environment.API_URL + '/login', {token: token}, httpOptions)
      .pipe(tap(data => this.setToken(data.token)));
  }

  /**
   * Checks if a token exists and is valid.
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token == null) {
      return false;
    }
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) < expiry;
  }

  /**
   * Logs the user out.
   */
  logout(): void {
    this.user = null;
    localStorage.setItem('Discord', null);
    localStorage.setItem('Token', null);
  }

  /**
   * Returns the currently logged-in user.
   */
  getUser(): Observable<User> {
    if (this.user) {
      return of(this.user);
    }
    return this.http.get<User>(environment.API_URL + '/users/@me', {headers: this.getHeaders()});
  }

  /**
   * Returns all headers required for API calls.
   */
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });
  }

}
