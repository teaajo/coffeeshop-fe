import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KORISNIK_URL } from '../app.constants';
import { Korisnik } from '../models/korisnik';

@Injectable({ //angular ima sopstveni dp inj , prihvata property providedIn-- umesto da smo u app modulu sami morali da dodajemo provajder, ne moramo zbog ovoga  
  //oznacava da u jedan ovakav servis mozemo injektovati zavisnosti nekih drugih klasa
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private httpClient: HttpClient) {  }
    //emituje podatke i mozemo da se pretplatimo na taj tok podataka
                                                          //vraca vise vrednosti, mozemo se unsubscribe sa toka podataka 
    public getAllKorisnik(): Observable<any> {  //metoda koja treba da uputi odg get zahtev ka odg endpointu 
      return this.httpClient.get(`${KORISNIK_URL}`);;
    }
    /*

    public addKorisnik(korisnik: Korisnik):Observable<any> {
      korisnik.id= 0;
     return  this.httpClient.post(`${KORISNIK_URL}`, korisnik);

    }*/

    public updateKorisnik(korisnik: Korisnik):Observable<any> {
      return  this.httpClient.put(`${KORISNIK_URL}`, korisnik);
 
     }

     public getById(id:number):Observable<any> {
      return  this.httpClient.get(`${KORISNIK_URL}/${id}`);
 
     }



     
public deleteKorisnik(id?:number): Observable<any>  {
  return this.httpClient.delete(`${KORISNIK_URL}/${id}`);


}
  
}
