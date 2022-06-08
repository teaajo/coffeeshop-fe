
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { Porudzbina } from 'src/app/models/porudzbina';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { KorpaComponent } from '../../korpa/korpa.component';
import { ThrowStmt } from '@angular/compiler';
import { Proizvod } from 'src/app/models/proizvod';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { HttpHeaders } from '@angular/common/http';
import { PaymentService } from 'src/app/services/payment.service';
@Component({
  selector: 'app-porudzbine-dialog',
  templateUrl: './porudzbine-dialog.component.html',
  styleUrls: ['./porudzbine-dialog.component.css']
})
export class PorudzbineDialogComponent implements OnInit {


  

  public flag?: number; 
  public korpaComponent: KorpaComponent;
 
  takePaymentResult: string;

  


  constructor(public snackBar:MatSnackBar, 
              public dialogRef:MatDialogRef<PorudzbineDialogComponent>,
            @Inject (MAT_DIALOG_DATA) public data: Porudzbina, 
          public porudzbineService: PorudzbinaService,private proizvodService:ProizvodService, private paymentService:PaymentService
         
         
         
         ) { }

  ngOnInit(): void {
   

  }
  

//add se poziva iz dijalog komp, na submit button 

compareTo(a: { id: any; }, b: { id: any; }) {
  return a.id == b.id;
}

public add(): void { 
debugger;
this.data.idKorisnik=JSON.parse(localStorage.getItem("id"));
this.data.proizvodi=JSON.parse(localStorage.getItem("proizvods"));
this.porudzbineService.addPorudzbina(this.data)
.subscribe(data=> {

    this.snackBar.open('Porudzbina je kreirana!: '+ data.id, 'U redu', {
      duration:2500
    })
    
    var proizvodi=[]

    localStorage.setItem("proizvods", JSON.stringify(proizvodi));
    localStorage.setItem("iznos", JSON.stringify(data.iznos));
    this.proizvodService.setItem("count",0);
    debugger;
    this.openCheckout( this.data.idKorisnik, data.iznos,(token: any) =>
    this.Payment(this.data.idKorisnik, data.iznos, token)
 );

    
    
}),


(error:Error) => {
  console.log(error.name + '-->' + error.message);
  this.snackBar.open('Greska! Pokusajte ponovo!: ', 'Zatvori', {
    duration:2500
  });
};
}

Payment( idKorisnik: number, iznos: number, token: any) {
  debugger;
  let body = {
    customer: idKorisnik,
    tokenId: token.id,
    amount:  iznos
   
  };
  let bodyString = JSON.stringify(body);
  let headers = new HttpHeaders({ "Content-Type": "application/json" });
  let options = { headers: headers };
debugger
  this.paymentService.addPayment(bodyString, options)
  
  .subscribe(data=> {
    this.snackBar.open('Uspesna uplata: '+ data.id, 'U redu', {
      duration:2500
    });
    
}),

(error:Error) => {
  console.log(error.name + '-->' + error.message);
  this.snackBar.open('Greska! Pokusajte ponovo!: ', 'Zatvori', {
    duration:2500
  });
};
  
  
  
    
    
}

openCheckout(idKorisnik: number, iznos: number, tokenCallback) {
  debugger;
  let handler = (<any>window).StripeCheckout.configure({
    key: "pk_test_51L88RCD3UxX0UV5F7HdZgryN4Ic2QHFxN4aN6QX47sPdSEztoJQbOQGwu03FUued3Ou3Szs0IgMKfy1dFw3ub0JH00iTPwTPWZ",
    locale: "auto",
    token: tokenCallback
  });
  debugger;

  handler.open({
  
   customer: idKorisnik,
    zipCode: false,
    currency: "rsd",
    amount: iznos,
    panelLabel: "Pay {{amount}}",
    allowRememberMe: false
  });
}



public update(): void {

  this.porudzbineService.updatePorudzbina(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno modifikovana porudzbina: '+ data.id, 'U redu', {
      duration:2500
    });
    
}),

(error:Error) => {
  console.log(error.name + '-->' + error.message);
  this.snackBar.open('Greska! Pokusajte ponovo!: ', 'Zatvori', {
    duration:2500
  });
};
}

public delete(): void {
  this.porudzbineService.deletePorudzbina(this.data.id)
  .subscribe(() => {
    this.snackBar.open('Uspesno obrisana porudzbina: ', 'U redu', {
      duration:2500
    });
  }),

  (error:Error) => {
    console.log(error.name + '-->' + error.message);
    this.snackBar.open('Greska! Pokusajte ponovo!: ', 'Zatvori', {
      duration:2500
    });
  };
}

public cancel(): void {

    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene!: ', 'U redu', {
      duration:1000
    });
}

}
