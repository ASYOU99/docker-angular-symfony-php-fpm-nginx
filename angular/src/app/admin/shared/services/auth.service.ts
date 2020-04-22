import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthResponse, User} from '../../../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  login(user: User): Observable<any> {

    return this.http.post(`${environment.apiAdminUrl}/login_check`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this)),
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {

    const message = error.error.message;

    this.error$.next(message);
    // switch (message) {
    //   case 'INVALID_EMAIL':
    //     this.error$.next('Неверный email');
    //     break;
    //   case 'INVALID_PASSWORD':
    //     this.error$.next('Неверный пароль');
    //     break;
    //   case 'EMAIL_NOT_FOUND':
    //     this.error$.next('Такого email нет');
    //     break;
    // }
    //
    return throwError(error);
  }

  private setToken(response: AuthResponse | null) {

    if (response) {

      const decoded = jwt_decode(response.token);

      const expDate = new Date(+decoded.exp * 1000);

      localStorage.setItem('token', response.token);

      localStorage.setItem('token-exp', expDate.toString());

    } else {

      localStorage.clear();
    }
  }
}
