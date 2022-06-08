import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PORUDZBINA_PO_KORISNIKU, PORUDZBINA_URL } from "../app.constants";
import { Porudzbina } from "../models/porudzbina";

@Injectable({ //angular ima sopstveni dp inj , prihvata property providedIn-- umesto da smo u app modulu sami morali da dodajemo provajder, ne moramo zbog ovoga  
    //oznacava da u jedan ovakav servis mozemo injektovati zavisnosti nekih drugih klasa
    providedIn: 'root'
  })
  export class PorudzbinaService {
  
    constructor(private httpClient: HttpClient) {  }
      //emituje podatke i mozemo da se pretplatimo na taj tok podataka
                                                            //vraca vise vrednosti, mozemo se unsubscribe sa toka podataka 
      public getAllPorudzbine(): Observable<any> {  //metoda koja treba da uputi odg get zahtev ka odg endpointu, ASINHRON PRISTUP
        return this.httpClient.get(`${PORUDZBINA_URL}`);;
      }
      public getPorudzbinaByKorisnikid(id: number): Observable<any> {  //metoda koja treba da uputi odg get zahtev ka odg endpointu, ASINHRON PRISTUP
        return this.httpClient.get(`${PORUDZBINA_PO_KORISNIKU}/${id}`);;
      }
      public addPorudzbina(porudzbina: Porudzbina):Observable<any> {
        porudzbina.id= 0; //bice vr odredjena sekvencom
       return  this.httpClient.post(`${PORUDZBINA_URL}`, porudzbina);
  
      }
  
      public updatePorudzbina(porudzbina: Porudzbina):Observable<any> {
        return  this.httpClient.put(`${PORUDZBINA_URL}`, porudzbina);
   
       }
       
  public deletePorudzbina(id?:number): Observable<any>  {
    return this.httpClient.delete(`${PORUDZBINA_URL}/${id}`);
  
  
  }
    
  }