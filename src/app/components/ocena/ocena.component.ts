import { Component, OnInit,OnChanges, ViewChild } from "@angular/core";
import { Proizvod } from "src/app/models/proizvod";
import { MatTableDataSource } from '@angular/material/table';
import { PorudzbinaComponent } from "../porudzbina/porudzbina.component";
import { PorudzbinaService } from "src/app/services/porudzbina.service";
import { PorudzbineDialogComponent } from "../dialogs/porudzbine-dialog/porudzbine-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Porudzbina } from "src/app/models/porudzbina";
import { Ocena } from "src/app/models/ocena";
import { Subscription } from "rxjs";
import { OcenaService } from "src/app/services/ocena.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
    selector: 'app-ocena',
    templateUrl: './ocena.component.html',
    styleUrls: ['./ocena.component.css']
  })
  export class OcenaComponent implements OnInit {
    displayedColumns = ['id', 'Ocena1', 'IdKorisnik', 'IdProizvod', 'actions'];
    dataSource?: MatTableDataSource<Proizvod>;
  
    ocenaComponent?: OcenaComponent;
    ocena:Ocena;
    subscription?: Subscription;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public dialog: MatDialog, private ocenaService:OcenaService) { 
          
        }

        ngOnInit(): void {
            this.loadData();
         
           }
           ngOnDestroy(): void { 
            //this.subscription?.unsubscribe();
         
           }
         
           
             public loadData() { 
               debugger;
               var uloga=localStorage.getItem("uloga");   
       
               debugger;
               if(uloga=='Zaposleni' || uloga=='Dostavljac') 
               {
               this.subscription = this.ocenaService.getAllOcene()//posto vraca observable 
               .subscribe(data => {
                   this.dataSource= new MatTableDataSource(data);
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
       
               }),
               (error: Error) => { 
                 console.log(error.name + ' '+ error.message);
               }
           }
           else{
               debugger;
               var id=JSON.parse(localStorage.getItem("id"));  
               debugger;
               this.subscription = this.ocenaService.getOcenaByKorisnik(id)//posto vraca observable 
               
               .subscribe(data => {
                   this.dataSource= new MatTableDataSource(data);
                   debugger;
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
       
               }),
               (error: Error) => { 
                 console.log(error.name + ' '+ error.message);
               }
           }
             }
         
             
             public Edit(flag: number, id?: number, ocena?: number, korisnikId?: number, proizvodId?: number) {
               const dialogRef = this.dialog.open(PorudzbineDialogComponent, {data: {id, ocena, korisnikId, proizvodId}}); //u konstanti cuvamo dijalog koji je otvoren
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
         
       
             
         public localStorageJWT(): boolean {
           return  localStorage.getItem("uloga")=='Zaposleni';
         }
       
       


    }