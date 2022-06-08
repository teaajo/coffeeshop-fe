import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KorisnikComponent } from './components/korisnik/korisnik.component';
import { ProizvodComponent } from './components/proizvod/proizvod.component';
import { LogInComponent } from './components/login/login.component';
//import { PorudzbinaComponent } from './components/porudzbina/porudzbina.component';
//import { ProizvodComponent } from './components/proizvod/proizvod.component';
import { TipProizvodaComponent } from './components/tip_proizvoda/tip_proizvoda.component';
import { RegistracijaComponent } from './components/registracija/registracija.component';
import { KorpaComponent } from './components/korpa/korpa.component';
import { PorudzbinaComponent } from './components/porudzbina/porudzbina.component';
import { OcenaComponent } from './components/ocena/ocena.component';



const routes: Routes = [ {path:'korisnik', component: KorisnikComponent},
{path:'proizvod', component: ProizvodComponent},
{path: 'tip_proizvoda', component: TipProizvodaComponent},
{path: 'login', component: LogInComponent},
{path: 'registracija', component: RegistracijaComponent},
{path: 'korpa', component: KorpaComponent},
{path: 'porudzbina', component: PorudzbinaComponent},
{path: 'ocene', component: OcenaComponent},





{path:'', redirectTo: 'tip_proizvoda', pathMatch:'full'}// ukoliko pogodimo praznu putanju, a nismo dodali pathmatch dobicemo endless petlju 
//redirekcija ide iz navigacionog bara 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
