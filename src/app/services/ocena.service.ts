import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OCENABYKORISNIK_URL, OCENA_URL } from "../app.constants";
import { Ocena } from "../models/ocena";
import { Porudzbina } from "../models/porudzbina";

@Injectable({ //angular ima sopstveni dp inj , prihvata property providedIn-- umesto da smo u app modulu sami morali da dodajemo provajder, ne moramo zbog ovoga  
    //oznacava da u jedan ovakav servis mozemo injektovati zavisnosti nekih drugih klasa
    providedIn: 'root'
  })
  export class OcenaService {
  
    constructor(private httpClient: HttpClient) {  }
      //emituje podatke i mozemo da se pretplatimo na taj tok podataka
                                                            //vraca vise vrednosti, mozemo se unsubscribe sa toka podataka 
      public getAllOcene(): Observable<any> {  //metoda koja treba da uputi odg get zahtev ka odg endpointu, ASINHRON PRISTUP
        return this.httpClient.get(`${OCENA_URL}`);;
      }
     
      public addOcena(ocena: Ocena):Observable<any> {
          debugger;
        ocena.id= 0; //bice vr odredjena sekvencom
       return  this.httpClient.post(`${OCENA_URL}`, ocena);
  
      }
  
      public updateOcena(ocena: Ocena):Observable<any> {
        return  this.httpClient.put(`${OCENA_URL}`, ocena);
   
       }
       public getOcenaByKorisnik(id: number): Observable<any> {  //metoda koja treba da uputi odg get zahtev ka odg endpointu, ASINHRON PRISTUP
        return this.httpClient.get(`${OCENABYKORISNIK_URL}/${id}`);;
      }
  
  
  
       
  public deleteOcena(id?:number): Observable<any>  {
    return this.httpClient.delete(`${OCENA_URL}/${id}`);
  
  
  }
    
  }