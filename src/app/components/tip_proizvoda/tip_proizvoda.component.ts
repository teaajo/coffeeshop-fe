import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Tip } from 'src/app/models/tip_proizvoda';
import { TipService } from 'src/app/services/tip.service';
import { TipDialogComponent } from '../dialogs/tip_proizvoda-dialog/tip_proizvoda-dialog.component';

@Component({
  selector: 'app-tip_proizvoda',
  templateUrl: './tip_proizvoda.component.html',
  styleUrls: ['./tip_proizvoda.component.css']
})
export class TipProizvodaComponent implements OnInit,OnDestroy  {

  displayedColumns = ['id', 'tip','actions'];
  dataSource?: MatTableDataSource<Tip>;
  subscription?: Subscription;
  selektovanTip?: Tip;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tipService: TipService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();

  }
  ngOnDestroy(): void { 
    this.subscription.unsubscribe();

  }
    public loadData() { 
      this.subscription = this.tipService.getAllTipovi()
      .subscribe(data => {
       // console.log(data);
       this.dataSource= new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      }),
      (error: Error) => { 
        console.log(error.name + ' '+ error.message);
      }
    
    }

    public openDialog(flag: number, id?: number, tip?: string) {
      const dialogRef = this.dialog.open(TipDialogComponent, {data: {id, tip}}); //u konstanti cuvamo dijalog koji je otvoren
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed()
        .subscribe(result => {
          if(result===1) {
            this.loadData();
          }
        })
    }

    selectRow(row: any) {
      // console.log(row);
      this.selektovanTip = row;
      // console.log(this.selektovanaPorudzbina);
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLocaleLowerCase();
      this.dataSource.filter = filterValue;
    }

    public localStorageJWT(): boolean {
      return  localStorage.getItem("uloga")=='Zaposleni';
    }

}
