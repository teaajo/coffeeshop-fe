import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor} from '@angular/common/http';

import { Observable } from 'rxjs';
//import { Http } from '@angular/http/src/http';
import { LoginOperationsService } from '../services/loginservices/login.service';
import { AuthService } from './AuthService';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("Intercepted");
    console.log("Token : ", localStorage.jwt);

    const token = this.authService.getAuthToken();
    debugger;
    let jwt = localStorage.jwt;
    if (jwt) 
    {
        console.log(request)
        request = request.clone(
            {
                setHeaders: 
                { 
                    Authorization: `Bearer ${jwt}`
                }
            });
        console.log(request)
    }

    return next.handle(request);
  }
}