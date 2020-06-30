
import { Component, OnInit, ViewChild } from '@angular/core';
import{ AdminService} from '../../../services/admin.service';
import {Chiffre} from '../../../model/chiffre';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
@Component({
  selector: 'app-chiffre',
  templateUrl: './chiffre.component.html',
  styleUrls: ['./chiffre.component.css']
})
export class ChiffreComponent implements OnInit {

 chiffreList: Array<Chiffre>;
  dataSource: MatTableDataSource<Chiffre> = new MatTableDataSource();
  displayedColumns: string[] = ['numero', 'nom', 'prenom','ca', 'categorie'];
  //selectedProduct: Product = new Product();
  errorMessage: string;
  infoMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllChiffre();
    console.log(this.chiffreList);
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllChiffre(){
    this.adminService.findAllChiffre().subscribe(data => {
      this.chiffreList = data;
      this.dataSource.data = data;
      console.log(data);
    });
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
