import {
    Router
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';
import { LOGIN_URL } from 'src/app/app.constants';
import { Principal } from 'src/app/models/login';
  
  @Injectable({
    providedIn: 'root'
  })
  export class LoginOperationsService {
  
    constructor(private httpClient: HttpClient, private router: Router) { }
  
    
    //log in
    getTheToken(login:Principal){  
      debugger;  
          if(!localStorage.jwt)
          {
            debugger;
            let headers = new HttpHeaders();
            headers = new HttpHeaders({'Content-Type': 'application/json'})
            
            let x = this.httpClient.post(`${LOGIN_URL}`, login,{"headers": headers}) as Observable<any>
            x.subscribe(
              jwt => {
      
                localStorage.setItem('jwt', jwt['token'])
                localStorage.setItem('uloga', jwt['uloga'])
                localStorage.setItem('id', jwt['id'])
                this.router.navigateByUrl('/proizvod');
              },
              err => {
                console.log("Error occured");
              }
            );
          }
        }
  
  }
  