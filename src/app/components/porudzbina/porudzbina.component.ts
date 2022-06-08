import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { Porudzbina } from "src/app/models/porudzbina";
import { Proizvod } from "src/app/models/proizvod";
import { PorudzbinaService } from "src/app/services/porudzbina.service";
import { PorudzbineDialogComponent } from "../dialogs/porudzbine-dialog/porudzbine-dialog.component";

@Component({
    selector: 'app-porudzbina',
    templateUrl: './porudzbina.component.html',
    styleUrls: ['./porudzbina.component.css']
  })

  export class PorudzbinaComponent implements OnInit{

    displayedColumns = ['id', 'iznos', 'adresa', 'datum','status', 'kupon','idKorisnik', 'actions'];
    dataSource?: MatTableDataSource<Porudzbina>;
    subscription?: Subscription;
    proizvods?: Proizvod[];
    porudzbina:Porudzbina;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
  
    constructor(private porudzbinaService:PorudzbinaService, 
      public dialog: MatDialog) { 
        debugger;
        
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
        this.subscription = this.porudzbinaService.getAllPorudzbine()//posto vraca observable 
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
        this.subscription = this.porudzbinaService.getPorudzbinaByKorisnikid(id)//posto vraca observable 
        .subscribe(data => {
            this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

        }),
        (error: Error) => { 
          console.log(error.name + ' '+ error.message);
        }
    }
      }
  /*
      public openDialog() {
          debugger;
        this.porudzbina=new Porudzbina();
        this.porudzbina.idKorisnik=JSON.parse(localStorage.getItem("id"));
        this.porudzbina.proizvodi=JSON.parse(localStorage.getItem("proizvods"));      
        const dialogRef = this.dialog.open(PorudzbineDialogComponent, {data: {id:this.porudzbina.id, iznos:this.porudzbina.iznos, adresa:this.porudzbina.adresa, datum:this.porudzbina.datum, 
            status:this.porudzbina.status, kupon:this.porudzbina.kupon, proizvodi: this.porudzbina.proizvodi,idKorisnik:this.porudzbina.idKorisnik}}); //u konstanti cuvamo dijalog koji je otvoren
        dialogRef.componentInstance.flag = 1;
        dialogRef.afterClosed()
          .subscribe(result => {
            if(result===1) {
              this.loadData();
            }
          })



      }
      */
      public Edit(flag: number, id?: number, iznos?: number, adresa?: string, datum?: Date, status?: string, kupon?: string, idKorisnik?:number) {
        const dialogRef = this.dialog.open(PorudzbineDialogComponent, {data: {id, iznos, adresa, datum, status, kupon, idKorisnik}}); //u konstanti cuvamo dijalog koji je otvoren
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