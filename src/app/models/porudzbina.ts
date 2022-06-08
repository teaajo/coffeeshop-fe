import { Proizvod } from "./proizvod";



export class Porudzbina 
{
    id: number;
    iznos: number;
    adresa: string; 
    datum: Date;
    status: string;
    kupon: string;
    proizvodi: Proizvod[];
    idKorisnik: number;



}