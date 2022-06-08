import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OCENABYKORISNIK_URL, OCENA_URL, PAYMENT } from "../app.constants";
import { Ocena } from "../models/ocena";
import { Porudzbina } from "../models/porudzbina";

@Injectable({ //angular ima sopstveni dp inj , prihvata property providedIn-- umesto da smo u app modulu sami morali da dodajemo provajder, ne moramo zbog ovoga  
    //oznacava da u jedan ovakav servis mozemo injektovati zavisnosti nekih drugih klasa
    providedIn: 'root'
  })
  export class PaymentService {
  
    constructor(private httpClient: HttpClient) {  }
      //emituje podatke i mozemo da se pretplatimo na taj tok podataka
                                                            //vraca vise vrednosti, mozemo se unsubscribe sa toka podataka 
     
      public addPayment(bodyString, options ):Observable<any> {
          debugger;
        //bice vr odredjena sekvencom
       return  this.httpClient.post(`${PAYMENT}`, bodyString, options);
  
      }
  
     
    
  }