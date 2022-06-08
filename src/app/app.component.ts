import { Component, OnInit } from '@angular/core';
import { ProizvodComponent } from './components/proizvod/proizvod.component';

import { Proizvod } from './models/proizvod';
import { ProizvodService } from './services/proizvod.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IT702018JovanovicTeodora';
proizvodComponent:ProizvodComponent;
proizvods:Proizvod[];
count:string;
  
constructor(private proizvodService:ProizvodService) {}
  logout()
  {
    localStorage.removeItem('jwt');
    localStorage.removeItem('uloga');
    localStorage.removeItem('id');
    localStorage.removeItem('proizvods');
    localStorage.removeItem('IdProizv');
    localStorage.removeItem('iznos');
    localStorage.removeItem('count');

  }

  ngOnInit(){
    this.count=JSON.parse(localStorage.getItem("count")); 

    this.proizvodService.watchStorage().subscribe((data:string) => {
      this.count= data;
      })
  }
 
  
}
