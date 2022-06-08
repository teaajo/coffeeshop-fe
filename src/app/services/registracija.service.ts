import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KORISNIK_URL } from '../app.constants';
import { Korisnik } from '../models/korisnik';

@Injectable({ //angular ima sopstveni dp inj , prihvata property providedIn-- umesto da smo u app modulu sami morali da dodajemo provajder, ne moramo zbog ovoga  
    //oznacava da u jedan ovakav servis mozemo injektovati zavisnosti nekih drugih klasa
    providedIn: 'root'
  })

  export class RegistracijaService {

    constructor(private httpClient: HttpClient) {  }

    public addKorisnik(korisnik: Korisnik):Observable<any> {
        korisnik.id= 0;
       return  this.httpClient.post(`${KORISNIK_URL}`, korisnik);
  
      }

  }