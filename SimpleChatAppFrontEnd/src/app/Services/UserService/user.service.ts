import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, of, tap, throwError } from 'rxjs';
import { UserModel } from '../../Models/UserModel';
import properties from '../properties.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient){}

  private getStandardOptions():any{
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getLoggedUser() : Observable<UserModel>{
    return this.httpClient.get<UserModel>(properties.LoggedUserApi,{
      withCredentials: true
    })
    .pipe(catchError(this.handleGetLoggedUserError));
  }

  private handleGetLoggedUserError(error: HttpErrorResponse){
    let errorMessage:string = '';
    if(error.status === 401){
      errorMessage = 'Error: Unauthorized';
    }else if(error.status === 0){
      errorMessage = 'Error: Cannot connect to the server';
    }
    return throwError(() => {
      alert(errorMessage);
      window.location.href = properties.LoginApi;
    });
  }

  onLoggout() : Observable<any> {
    return this.httpClient.post(properties.LogoutApi,null,{
      withCredentials: true,
      responseType: 'text'
    })
    .pipe(
      tap(() => {
        localStorage.clear();
      }),
      map(() => {
        return true;  
      }),
      catchError((error) => {
        console.error('Logout failed:', error);
        return of(false);
      }),
      finalize(() => {
        window.location.href = properties.LoginApi;
      })
    );
  }
}
