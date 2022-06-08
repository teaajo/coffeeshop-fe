import { Tip } from "./tip_proizvoda";

export class Proizvod {
    id: number;
    
    naziv: string;
    cena: number;
    opis: string;
    prosecnaOcena: number;
    kolicina: number;
    tip: Tip;
    idTip: number;
    
   
   
}