import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {Router} from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { Principal } from 'src/app/models/login';
import { LoginOperationsService } from 'src/app/services/loginservices/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {

  user:Korisnik;
  constructor(private loginSevice: LoginOperationsService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(login: Principal,form: NgForm) {
    debugger;
    if(!localStorage.jwt)
    {
      debugger;
      this.loginSevice.getTheToken(login)
      /*.subscribe(
        data => {
          debugger;
          this.user=data;
          localStorage.setItem('jwt',this.user.id .toString())
          localStorage.setItem('role',this.user.tip);

          this.router.navigateByUrl('/home');
          alert("User is registrated succesfully.");
        },
        error => {
          alert(error.error.Message);
        })*/
  
      form.reset();
      }
      else
      {
        alert("User is already loged in");
        form.reset();
      }
    }
}
