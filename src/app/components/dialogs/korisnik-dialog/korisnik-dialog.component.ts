
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-korisnik-dialog',
  templateUrl: './korisnik-dialog.component.html',
  styleUrls: ['./korisnik-dialog.component.css']
})
export class KorisnikDialogComponent implements OnInit {

  public flag: number; 

  constructor(public snackBar:MatSnackBar, 
              public dialogRef:MatDialogRef<KorisnikDialogComponent>,
            @Inject (MAT_DIALOG_DATA) public data: Korisnik, 
          public korisnikService: KorisnikService ) { }

  ngOnInit(): void {
  }
//add se poziva iz dijalog komp, na submit button 
/*
public add(): void { 

this.korisnikService.addKorisnik(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno dodato preduzece: '+ data.ime, 'U redu', {
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
*/
public update(): void {

  this.korisnikService.updateKorisnik(this.data)
.subscribe(data=> {
    this.snackBar.open('Uspesno modifikovano preduzece: '+ data.ime, 'U redu', {
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
  this.korisnikService.deleteKorisnik(this.data.id)
  .subscribe(() => {
    this.snackBar.open('Uspesno obrisano preduzece: ', 'U redu', {
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





  



