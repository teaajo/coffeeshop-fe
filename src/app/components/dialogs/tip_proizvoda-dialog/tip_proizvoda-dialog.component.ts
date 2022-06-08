
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Tip } from 'src/app/models/tip_proizvoda';
import { TipService } from 'src/app/services/tip.service';
import { Proizvod } from 'src/app/models/proizvod';
import { ProizvodService } from 'src/app/services/proizvod.service';

@Component({
  selector: 'app-tip_proizvoda-dialog',
  templateUrl: './tip_proizvoda-dialog.component.html',
  styleUrls: ['./tip_proizvoda-dialog.component.css']
})
export class TipDialogComponent implements OnInit {

  proizvod?: Proizvod[];
  public flag?: number; 
  proizvodSubscription?: Subscription;


 


  constructor(public snackBar:MatSnackBar, 
              public dialogRef:MatDialogRef<TipDialogComponent>,
            @Inject (MAT_DIALOG_DATA) public data: Tip, 
          public tipService: TipService,
         ) { }

  ngOnInit(): void {
    /*this.proizvodSubscription= this.proizvodService.getAllProizvod()
    .subscribe(proizvod => {
      this.proizvod=proizvod*/
  
}

compareTo(a: { id: any; }, b: { id: any; }) {
  return a.id == b.id;
}
//add se poziva iz dijalog komp, na submit button 
public add(): void { 

this.tipService.addTip(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno dodato obrazovanje: '+ data.tip, 'U redu', {
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

  this.tipService.updateTip(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno modifikovano obrazovanje: '+ data.tip, 'U redu', {
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
  this.tipService.DeleteTip(this.data.id)
  .subscribe(() => {
    this.snackBar.open('Uspesno obrisano obrazovanje: ', 'U redu', {
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
