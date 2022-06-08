import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { KorisnikDialogComponent } from '../dialogs/korisnik-dialog/korisnik-dialog.component';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.css']
})
export class KorisnikComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'ime', 'prezime', 'korisnickoIme','lozinka','tip','adresa','telefon','actions'];
  dataSource: MatTableDataSource<Korisnik>;
  subscription: Subscription;
  selektovanKorisnik?: Korisnik;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private korisnikService: KorisnikService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();

  }
  ngOnDestroy(): void { 
   // this.subscription?.unsubscribe();

  }
    public loadData() { 
      debugger;
      var uloga=localStorage.getItem("uloga");   

      debugger;
      if(uloga=='Zaposleni' || uloga=='Dostavljac') {
      this.subscription = this.korisnikService.getAllKorisnik()
      .subscribe(data => {
       // console.log(data);
       this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }),
      
      (error: Error) => { 
        console.log(error.name + ' '+ error.message);
      }
    
    }
    else
    {
      debugger;
      var id=JSON.parse(localStorage.getItem("id"));  
      debugger;
      this.subscription = this.korisnikService.getById(id)
      
      .subscribe(data => {
       // console.log(data);
       var korisnici=[];
       korisnici.push(data);
       debugger;
       this.dataSource= new MatTableDataSource(korisnici);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }),
      
      (error: Error) => { 
        console.log(error.name + ' '+ error.message);
      }

    }
  }
 

    public openDialog(flag: number, id?: number, ime?: string, prezime?: string, korisnickoIme?: string, lozinka?: string, tip?: string, adresa?:string, telefon?: string) {
      const dialogRef = this.dialog.open(KorisnikDialogComponent, {data: {id, ime, prezime, korisnickoIme, lozinka, tip, adresa, telefon}}); //u konstanti cuvamo dijalog koji je otvoren
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed()
        .subscribe(result => {
          if(result===1) {
            this.loadData();
          }
        })
    }

    selectRow(row: any) {
      // console.log(row);
      this.selektovanKorisnik = row;
      // console.log(this.selektovanaPorudzbina);
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLocaleLowerCase();
      this.dataSource.filter = filterValue;
    }

}
