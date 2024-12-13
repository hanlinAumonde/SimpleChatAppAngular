import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import properties from '../../properties.json';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor{
    constructor(private router:Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage:string = 'e';
                if(error.status === 401){
                    errorMessage = 'Error: Unauthorized';
                }
                else if(req.url.includes(properties.ChatroomApi) && req.method === 'POST' && error.status === 409){
                    errorMessage = 'Error: Chatroom already exists';
                    return throwError(() => {
                        alert(errorMessage);
                        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                            this.router.navigate(['/planifier-a-chatroom']);
                        });
                    });
                }
                else /* if(error.status === 0) */{
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
