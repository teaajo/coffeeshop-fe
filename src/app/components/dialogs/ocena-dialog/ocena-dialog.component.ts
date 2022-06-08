import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { Porudzbina } from 'src/app/models/porudzbina';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { KorpaComponent } from '../../korpa/korpa.component';
import { ThrowStmt } from '@angular/compiler';
import { Proizvod } from 'src/app/models/proizvod';
import { Ocena } from 'src/app/models/ocena';
import { OcenaService } from 'src/app/services/ocena.service';
@Component({
  selector: 'app-ocena-dialog',
  templateUrl: './ocena-dialog.component.html',
  styleUrls: ['./ocena-dialog.component.css']
})
export class OcenaDialogComponent implements OnInit {


  

  public flag?: number; 
 

  


  constructor(public snackBar:MatSnackBar, 
              public dialogRef:MatDialogRef<OcenaDialogComponent>,
            @Inject (MAT_DIALOG_DATA) public data: Ocena, 
          public ocenaService: OcenaService
         
         
         
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
this.data.idProizvod=JSON.parse(localStorage.getItem("idProizv"));
this.ocenaService.addOcena(this.data)
.subscribe(data=> {

    this.snackBar.open('Ocena je evidentirana!: '+ data.id, 'U redu', {
      duration:2500
    })
    
    /*
    var proizvodi=[]
    localStorage.setItem("proizvods", JSON.stringify(proizvodi));*/

    
    
}),


(error:Error) => {
  console.log(error.name + '-->' + error.message);
  this.snackBar.open('Greska! Pokusajte ponovo!: ', 'Zatvori', {
    duration:2500
  });
};
}

public update(): void {

  this.ocenaService.updateOcena(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno modifikovana ocena: '+ data.id, 'U redu', {
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
  this.ocenaService.deleteOcena(this.data.id)
  .subscribe(() => {
    this.snackBar.open('Uspesno obrisana ocena: ', 'U redu', {
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
