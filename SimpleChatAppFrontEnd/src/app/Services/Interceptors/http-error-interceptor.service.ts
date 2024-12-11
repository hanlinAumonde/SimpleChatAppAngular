import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import properties from '../../properties.json';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor{
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
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
            })
        );
    }
}
