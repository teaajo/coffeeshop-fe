import { Component, OnInit, OnDestroy, Input, OnChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Observable, Subject, Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Proizvod } from 'src/app/models/proizvod';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { Tip } from 'src/app/models/tip_proizvoda';
import { ProizvodDialogComponent } from '../dialogs/proizvod-dialog/proizvod-dialog.component';
import { Ocena } from 'src/app/models/ocena';
import { OcenaDialogComponent } from '../dialogs/ocena-dialog/ocena-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';






@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
 
})
export class ProizvodComponent implements OnInit, OnChanges {

  displayedColumns = ['id', 'naziv', 'cena', 'opis','prosecnaOcena', 'kolicina', 'tip', 'actions'];
  dataSource?: MatTableDataSource<Proizvod>;
  tipsubscription?: Subscription;
  proizvods?: Proizvod[];
  ocena?: Ocena;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 @Input() selektovanTip: Tip ;

  constructor(private proizvodService:ProizvodService, 
    public dialog: MatDialog, public snackBar:MatSnackBar, ) { 
      debugger;
      this.proizvods=[];
    }
    

  ngOnInit(): void {
   // this.loadData();

  }
  ngOnDestroy(): void { 
   //this.subscription?.unsubscribe();

  }

  ngOnChanges(): void {
    if(this.selektovanTip.tip) {
      debugger;
      this.loadData();
    }
  }
    public loadData() { 
      debugger;
      this.tipsubscription = this.proizvodService.getAllProizvod(this.selektovanTip.tip)//posto vraca observable
      .subscribe(data => {
       // console.log(data);
       debugger;
       this.dataSource= new MatTableDataSource(data);
       this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'tip' ? currentTerm + data.tip.tip : currentTerm + data[key];

          
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      // sortiranje po nazivu ugnježdenog objekta
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'tip': return data.tip.tip.toLocaleLowerCase();
         ;
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }),
      (error: Error) => { 
        console.log(error.name + ' '+ error.message);
      }
    
    }

    public openDialog(flag: number, id?: number, naziv?: string, cena?: number, opis?: string, prosecnaOcena?: number, kolicina?: number, tip?:Tip, idTip?:number) {
      const dialogRef = this.dialog.open(ProizvodDialogComponent, {data: {id, naziv, cena, opis, prosecnaOcena, kolicina, tip, idTip}}); //u konstanti cuvamo dijalog koji je otvoren
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed()
        .subscribe(result => {
          if(result===1) {
            this.loadData();
          }
        })
    }

    selectRow(row: any) {
        console.log(row);
    }

    public addInBasket(proizvod: Proizvod)
    {
      if(proizvod.kolicina==0)
      {
        this.snackBar.open('Proizvod nije na stanju!: '+ proizvod.naziv, 'U redu', {
          duration:2500
        })

      }
      else
      {

     
      this.proizvods.push(proizvod);
     // Object.assign({}, this.proizvods);
    //JSON.stringify(this.proizvods)
      //localStorage.setItem("proizvodi", this.proizvods.toString());
      //localStorage.setItem('proizvodi',   JSON.stringify(this.proizvods));
      debugger;
      localStorage.setItem("proizvods", JSON.stringify(this.proizvods)); //store colors
      this.proizvodService.setItem("count",this.proizvods.length);
     // localStorage.setItem("count", JSON.stringify(this.proizvods.length)); 
      var storedProizvods = JSON.parse(localStorage.getItem("proizvods")); 
      console.log(this.proizvods);
      this.snackBar.open('Proizvod je dodat u korpu!: '+ proizvod.naziv, 'U redu', {
        duration:2500
      })
// 👇️ parse the value when accessing it
    }
      
    }

    public Rate(proizvod: Proizvod)
    {
      localStorage.setItem("idProizv", JSON.stringify(proizvod.id));
      this.openDialogOcena();

    }

   
    
    public openDialogOcena()
    {
      debugger;
      this.ocena=new Ocena();
      this.ocena.idKorisnik=JSON.parse(localStorage.getItem("id"));
      this.ocena.idProizvod=JSON.parse(localStorage.getItem("idProizv"));      
      const dialogRef = this.dialog.open(OcenaDialogComponent, {data: {id:this.ocena.id, ocena:this.ocena.ocena1, korisnikId:this.ocena.idKorisnik, proizvodId:this.ocena.idProizvod, 
         }}); //u konstanti cuvamo dijalog koji je otvoren
      dialogRef.componentInstance.flag = 1;
      dialogRef.afterClosed()
        .subscribe(result => {
          if(result===1) {
           // this.loadData();
          }
        })

    }


  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLocaleLowerCase();
      this.dataSource.filter = filterValue;
    }

    public localStorageJWT(): boolean {
      return  localStorage.getItem("uloga")=='Zaposleni';
    }


}
