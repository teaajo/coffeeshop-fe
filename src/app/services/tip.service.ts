import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TIP_PROIZVODA_URL } from '../app.constants';
import { Tip } from '../models/tip_proizvoda';

@Injectable({ //angular ima sopstveni dp inj , prihvata property providedIn-- umesto da smo u app modulu sami morali da dodajemo provajder, ne moramo zbog ovoga  
  //oznacava da u jedan ovakav servis mozemo injektovati zavisnosti nekih drugih klasa
  providedIn: 'root'
})
export class TipService {

  constructor(private httpClient: HttpClient) {  }
    //emituje podatke i mozemo da se pretplatimo na taj tok podataka
                                                          //vraca vise vrednosti, mozemo se unsubscribe sa toka podataka 
    public getAllTipovi(): Observable<any> {  //metoda koja treba da uputi odg get zahtev ka odg endpointu 
      return this.httpClient.get(`${TIP_PROIZVODA_URL}`);;
    }

    public addTip(tip: Tip):Observable<any> {
      tip.id= 0;
     return  this.httpClient.post(`${TIP_PROIZVODA_URL}`, tip);

    }

    public updateTip(tip: Tip):Observable<any> {
      return  this.httpClient.put(`${TIP_PROIZVODA_URL}`, tip);
 
     }



     
public DeleteTip(id?:number): Observable<any>  {
  return this.httpClient.delete(`${TIP_PROIZVODA_URL}/${id}`);


}
  
}
