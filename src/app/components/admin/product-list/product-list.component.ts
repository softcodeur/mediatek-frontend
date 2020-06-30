import { Component, OnInit, ViewChild } from '@angular/core';
import{ AdminService} from '../../../services/admin.service';
import {Product} from '../../../model/product';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Array<Product>;
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  displayedColumns: string[] = ['numero', 'libelle', 'prix','stock', 'action'];
  selectedProduct: Product = new Product();
  errorMessage: string;
  infoMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllProducts();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllProducts(){
    this.adminService.findAllProducts().subscribe(data => {
      this.productList = data;
      this.dataSource.data = data;
      console.log(data);
    });
  }

  createNewProductRequest(){
    this.selectedProduct = new Product();
    $('#productModal').modal('show');
  }

  editProductRequest(product: Product){
    this.selectedProduct = product;
    $('#productModal').modal('show');
  }

  saveProduct(){
    if(!this.selectedProduct.num_prod){
      this.createProduct();
    }else{
      this.updateProduct();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createProduct(){
    this.adminService.createProduct(this.selectedProduct).subscribe(data => {
      this.productList.push(data);
      this.dataSource = new MatTableDataSource(this.productList);
      this.infoMessage = "Traitement effectué avec succès";
      $('#productModal').modal('hide');
    },err => {
      this.errorMessage = "Erreur inattendue.";
    });
  }

  updateProduct(){
    this.adminService.updateProduct(this.selectedProduct).subscribe(data => {
      let itemIndex = this.productList.findIndex(item => item.num_prod== this.selectedProduct.num_prod);
      this.productList[itemIndex] = this.selectedProduct;
      this.dataSource = new MatTableDataSource(this.productList);
      this.infoMessage = "Traitement effectué avec succès";
      $('#productModal').modal('hide');
    },err => {
      this.errorMessage = "Erreur inattendue.";
    });
  }

  deleteProductRequest(product: Product){
    this.selectedProduct = product;
    $('#deleteModal').modal('show');
  }

  deleteProduct(){
    this.adminService.deleteProduct(this.selectedProduct).subscribe(data => {
      let itemIndex = this.productList.findIndex(item => item.num_prod == this.selectedProduct.num_prod);
      if(itemIndex !== -1){
        this.productList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.productList);
      this.infoMessage = "Traitement effectué avec succès";
      $('#deleteModal').modal('hide');
    },err => {
      this.errorMessage = "Erreur inattendue.";
    });
  }
}
