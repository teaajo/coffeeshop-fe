import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //angular interfejs koji omogucava slanje http poziva ka apiju
import { Observable, Subject } from 'rxjs';
import { PROIZVOD_URL, PROIZV_PO_TIPU } from '../app.constants';
import { Proizvod } from '../models/proizvod';


@Injectable({ //angular ima sopstveni dp inj , prihvata property providedIn-- umesto da smo u app modulu sami morali da dodajemo provajder, ne moramo zbog ovoga  
  //oznacava da u jedan ovakav servis mozemo injektovati zavisnosti nekih drugih klasa
  providedIn: 'root'
})
export class ProizvodService {

  private storageSub= new Subject();
  constructor(private httpClient: HttpClient) {  }
    //emituje podatke i mozemo da se pretplatimo na taj tok podataka
                                                          //vraca vise vrednosti, mozemo se unsubscribe sa toka podataka 
    public getAllProizvod(tip:string): Observable<any> {  //metoda koja treba da uputi odg get zahtev ka odg endpointu, ASINHRON PRISTUP
      return this.httpClient.get(`${PROIZV_PO_TIPU}/${tip}`);;
    }

    public addProizvod(proizvod: Proizvod):Observable<any> {
      proizvod.id= 0; //bice vr odredjena sekvencom
     return  this.httpClient.post(`${PROIZVOD_URL}`, proizvod);

    }
    watchStorage(): Observable<any> {
      return this.storageSub.asObservable();
    }

   public setItem(key: string, data: any) {
      localStorage.setItem(key, data);
      this.storageSub.next(data);
    }


    public updateProizvod(proizvod: Proizvod):Observable<any> {
      return  this.httpClient.put(`${PROIZVOD_URL}`, proizvod);
 
     }



     
public deleteProizvod(id?:number): Observable<any>  {
  return this.httpClient.delete(`${PROIZVOD_URL}/${id}`);


}
  
}