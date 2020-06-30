import { Component, OnInit, ViewChild } from '@angular/core';
import{ AdminService} from '../../../services/admin.service';
import {Demande} from '../../../model/demande';
import {Product} from '../../../model/product';

import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  
 demandeList: Array<Demande> = new Array<Demande>();
 productList: Array<Product>;
  dataSource: MatTableDataSource<Demande> = new MatTableDataSource();
  displayedColumns: string[] = ['numero', 'libelle', 'demande'];

  errorMessage: string;
  infoMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllProduct();  
}
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

 

  findAllProduct():any{
    this.adminService.findAllProducts().subscribe(data => {
         console.log(data);
        this.productList = data; 
        this.productList.forEach(prod=>{
        this.adminService.findAllDemande(prod.num_prod).subscribe(data => {
       let d = data.response;
       let demande:Demande = new Demande();
       demande.num_prod = prod.num_prod;
       demande.libelle = prod.libelle;
       demande.demande = d;
      this.demandeList.push(demande);
      this.dataSource.data = this.demandeList;
      console.log(data.response);
    });
    });

    });
  }



   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
