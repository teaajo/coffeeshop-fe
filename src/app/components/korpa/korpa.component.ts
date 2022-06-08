import { Component, OnInit,OnChanges, INJECTOR } from "@angular/core";
import { Proizvod } from "src/app/models/proizvod";
import { MatTableDataSource } from '@angular/material/table';
import { PorudzbinaComponent } from "../porudzbina/porudzbina.component";
import { PorudzbinaService } from "src/app/services/porudzbina.service";
import { PorudzbineDialogComponent } from "../dialogs/porudzbine-dialog/porudzbine-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Porudzbina } from "src/app/models/porudzbina";
import { ProizvodService } from "src/app/services/proizvod.service";
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { PaymentService } from "src/app/services/payment.service";
import { waitForAsync } from "@angular/core/testing";





@Component({
    selector: 'app-korpa',
    templateUrl: './korpa.component.html',
    styleUrls: ['./korpa.component.css']
  })
  export class KorpaComponent implements OnInit, OnChanges {
    displayedColumns = ['id', 'naziv', 'cena', 'opis','prosecnaOcena', 'kolicina', 'tip', 'actions'];
    dataSource?: MatTableDataSource<Proizvod>;
    proizvods?: Proizvod[];
    porudzbineComponent?: PorudzbinaComponent;
    porudzbina:Porudzbina;
    takePaymentResult: string;
   
    
    

    constructor(
        public dialog: MatDialog, private proizvodService:ProizvodService, public http: HttpClient) { 
         
          
        }

    ngOnInit(): void {
        // this.loadData();
        debugger;
        this.dataSource= new MatTableDataSource(JSON.parse(localStorage.getItem("proizvods")));
        this.proizvods=JSON.parse(localStorage.getItem("proizvods"));
       }
       ngOnDestroy(): void { 
        //this.subscription?.unsubscribe();
     
       }
     
       ngOnChanges(): void {
        
         }

         public Chart(proizvod:Proizvod)
      {
        debugger;
        //this.proizvodComponent.Chartt();
        console.log(JSON.parse(localStorage.getItem("proizvods")));
       

      }
      public Remove(proizvod:Proizvod)
      {
          debugger;
        var index=this.proizvods.indexOf(this.proizvods.find(p=>p.id==proizvod.id))
        this.proizvods.splice(index,1);
        this.dataSource.data = this.proizvods;
        localStorage.setItem("proizvods", JSON.stringify(this.proizvods));
        this.proizvodService.setItem("count",this.proizvods.length);
      }

      
      public KreirajPorudzbinu()
      {
        this.openDialog();
      }

      public openDialog() {
        debugger;
      this.porudzbina=new Porudzbina();
      this.porudzbina.idKorisnik=JSON.parse(localStorage.getItem("id"));
      this.porudzbina.proizvodi=JSON.parse(localStorage.getItem("proizvods"));      
      const dialogRef = this.dialog.open(PorudzbineDialogComponent, {data: {id:this.porudzbina.id, iznos:this.porudzbina.iznos, adresa:this.porudzbina.adresa, datum:this.porudzbina.datum, 
          status:this.porudzbina.status, kupon:this.porudzbina.kupon, proizvodi:this.porudzbina.proizvodi, idKorisnik:this.porudzbina.idKorisnik}}); //u konstanti cuvamo dijalog koji je otvoren
      dialogRef.componentInstance.flag = 1;
      dialogRef.afterClosed()

        .subscribe(result => {
          if(result===1) {
           // this.loadData();
            this.porudzbina.iznos= JSON.parse(localStorage.getItem("iznos"));
           
          }
        });

          debugger;
          setTimeout(function(){
            console.log("Executed after 1 second");
        }, 10000);
        

       
    }

    


    }