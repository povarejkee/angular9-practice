import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { IFirebaseAuthResponse, IUser } from '../../../shared/interfaces'
import { Observable, Subject, throwError } from 'rxjs'
import { environment } from '../../../../environments/environment'
import { catchError, tap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AuthService {
  public errorMessage$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {}

  get token(): string {
    const token = localStorage.getItem('auth-token')
    const expiresDate = new Date(localStorage.getItem('auth-expires'))

    if (expiresDate < new Date()) {
      this.logout()
      return null
    }

    return token
  }

  setToken(response: IFirebaseAuthResponse): void {
    const ms = Date.now() + Number(response.expiresIn) * 1000
    const expiresDate = new Date(ms)

    localStorage.setItem('auth-token', response.idToken)
    localStorage.setItem('auth-expires', String(expiresDate))
  }

  errorHandling = (error: HttpErrorResponse): Observable<never> => {
    const { message } = error.error.error

    switch (message) {
      case 'INVALID_EMAIL':
        this.errorMessage$.next('Невалидный email')
        break
      case 'INVALID_PASSWORD':
        this.errorMessage$.next('Неверный пароль')
        break
      case 'EMAIL_NOT_FOUND':
        this.errorMessage$.next('Неверный email')
        break
      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts. Please try again later.':
        this.errorMessage$.next(
          'Слишком много неудачных попыток входа. Попробуйте позже'
        )
    }

    return throwError(error)
  }

  login(user: IUser): Observable<any> {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken), catchError(this.errorHandling))
  }

  logout(): void {
    localStorage.clear()
  }

  isAuth(): boolean {
    return Boolean(this.token)
  }
}
