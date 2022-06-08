import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';


import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatSort, MatSortModule } from '@angular/material/sort';
import { KorisnikComponent } from './components/korisnik/korisnik.component';

import { TipDialogComponent } from './components/dialogs/tip_proizvoda-dialog/tip_proizvoda-dialog.component';
import { TipProizvodaComponent } from './components/tip_proizvoda/tip_proizvoda.component';
import { KorisnikDialogComponent } from './components/dialogs/korisnik-dialog/korisnik-dialog.component';
import { ProizvodComponent } from './components/proizvod/proizvod.component';
import { ProizvodDialogComponent } from './components/dialogs/proizvod-dialog/proizvod-dialog.component';

import { LogInComponent } from './components/login/login.component';
import { TokenInterceptor } from './interceptor/login.interceptor';
import { AuthService } from './interceptor/AuthService';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistracijaComponent } from './components/registracija/registracija.component';
import { KorpaComponent } from './components/korpa/korpa.component';
import { PorudzbinaComponent } from './components/porudzbina/porudzbina.component';
import { PorudzbineDialogComponent } from './components/dialogs/porudzbine-dialog/porudzbine-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingModule } from 'ng-starrating';
import { StarRatingModule } from 'angular-star-rating';
import { OcenaDialogComponent } from './components/dialogs/ocena-dialog/ocena-dialog.component';
import { OcenaComponent } from './components/ocena/ocena.component';



@NgModule({
  declarations: [
    AppComponent,
    KorisnikComponent,
   KorisnikDialogComponent,
    TipDialogComponent,
    TipProizvodaComponent,
    ProizvodComponent,
    ProizvodDialogComponent,
    LogInComponent,
    RegistracijaComponent,
    KorpaComponent,
    PorudzbinaComponent,
    PorudzbineDialogComponent,
    OcenaDialogComponent,
    OcenaComponent,
  
  

 
    
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgbModule,
    RatingModule,
    StarRatingModule.forRoot(),
    
  
    
    
   
  ],
  providers: [
    AuthService , 
    
   {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
   }],
  bootstrap: [AppComponent]
})
export class AppModule { }
