
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subscription } from 'rxjs';
import { Tip } from 'src/app/models/tip_proizvoda';
import { Proizvod } from 'src/app/models/proizvod';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { TipService } from 'src/app/services/tip.service';
@Component({
  selector: 'app-proizvod-dialog',
  templateUrl: './proizvod-dialog.component.html',
  styleUrls: ['./proizvod-dialog.component.css']
})
export class ProizvodDialogComponent implements OnInit {

  tip?: Tip[];
  

  public flag?: number; 
  
  tipSubscription?: Subscription;
  


  constructor(public snackBar:MatSnackBar, 
              public dialogRef:MatDialogRef<ProizvodDialogComponent>,
            @Inject (MAT_DIALOG_DATA) public data: Proizvod, 
          public proizvodService: ProizvodService,
          public tipService: TipService
         
         ) { }

  ngOnInit(): void {
    this.tipSubscription= this.tipService.getAllTipovi()
    .subscribe(tip => {
      this.tip=tip

    })

  }
  

//add se poziva iz dijalog komp, na submit button 

compareTo(a: { id: any; }, b: { id: any; }) {
  return a.id == b.id;
}

public add(): void { 
debugger;
this.data.idTip=this.data.tip.id;
this.proizvodService.addProizvod(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno dodat radnik: '+ data.naziv, 'U redu', {
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

public update(): void {

  this.proizvodService.updateProizvod(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno modifikovan radnik: '+ data.naziv, 'U redu', {
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
  this.proizvodService.deleteProizvod(this.data.id)
  .subscribe(() => {
    this.snackBar.open('Uspesno obrisan radnik: ', 'U redu', {
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
