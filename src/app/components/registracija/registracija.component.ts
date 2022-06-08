import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Korisnik } from 'src/app/models/korisnik';
import { RegistracijaService } from 'src/app/services/registracija.service';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'app-registracija',
    templateUrl: './registracija.component.html',
    styleUrls: ['./registracija.component.css']
  })

  export class RegistracijaComponent implements OnInit, OnDestroy {

    
  displayedColumns = ['id', 'ime', 'prezime', 'korisnickoIme','lozinka','tip','adresa','telefon','actions'];
  dataSource: MatTableDataSource<Korisnik>;
  subscription: Subscription;


  constructor(private registracijaService: RegistracijaService, 
    public snackBar:MatSnackBar,
    private router:Router
    ) { }

  ngOnInit(): void {
   

  }
  ngOnDestroy(): void { 
   // this.subscription?.unsubscribe();

  }

  public add(korisnik: Korisnik, form: NgForm): void { 

    this.registracijaService.addKorisnik(korisnik)
    .subscribe(data=> {
        this.snackBar.open('Uspesna registracija!: '+ data.ime, 'U redu', {
          duration:2500
        });
        
    }),
    
    
    (error:Error) => {
      console.log(error.name + '-->' + error.message);
      this.snackBar.open('Greska! Pokusajte ponovo!: ', 'Zatvori', {
        duration:2500
      });
      this.router.navigateByUrl('/login');
    };
    }



  }