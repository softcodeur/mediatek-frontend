import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import {LigneFacture} from "../../../../model/ligne-facture";
import {Product} from "../../../../model/product";
import {AdminService} from "../../../../services/admin.service";
import {Facture} from "../../../../model/facture";

@Component({
  selector: "app-order-items",
  templateUrl: "./order-items.component.html",
  styles: [] 
})
export class OrderItemsComponent implements OnInit {
  formData: LigneFacture;
  itemList: Product[]; // Item Model
  isValid: boolean = true;
  errorMessage:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    // Dialog Popup Open
    public dialogRef: MatDialogRef<OrderItemsComponent> /* Servis from get api List...*/,
    private service: AdminService /*ItemService*/,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.service.findAllProducts().subscribe(res => (this.itemList = res as Product[]));
    if (this.data.OrderItemIndex == null)

      this.formData = {

        id: null,
        produit:new Product(),
        facture: new Facture(),
        quantite: 0,
        total: 0
      };
    else {
      this.formData = Object.assign(
        {},
        this.service.orderItems[this.data.OrderItemIndex]
      );
    }
  }

  updatePrice(ctrl) {
    this.toastr.info("Seçildi", ctrl.value + "-" + ctrl.selectedIndex);
    if ((ctrl.selectedIndex == 0)) {
      this.formData.produit.prix= 0;
      this.formData.produit.libelle = "";
    } else {
      console.log(ctrl.selectedIndex);
      this.formData.produit.prix = this.itemList[ctrl.selectedIndex - 1].prix;
      this.formData.produit.libelle = this.itemList[ctrl.selectedIndex - 1].libelle;
    }
  }
  updateTotal() {
    this.formData.total = 545;
    this.formData.total = parseFloat(
      (this.formData.quantite * this.formData.produit.prix).toFixed(2)
    );
  }
  onSubmit(form: NgForm) {
  console.log("**********Item")
    console.log(form.value);
    let produit = new Product();
     produit.num_prod = form.value.item.num_prod;
     produit.libelle = form.value.ItemName;
     produit.prix = form.value.Price;
  console.log(produit);
      let facture = new Facture();
      facture.numero = form.value.OrderID;
     let orderItem ={
       id:form.value.OrderItemID,
       produit:produit,
       facture:facture,
       quantite:form.value.Quantity,
       total:form.value.Total
     }
     console.log("**********bolean*****")
      console.log(this.validateForm(form.value));

    if (this.validateForm(form.value)) {
     console.log("*********************************ORDERIEMS");
      console.log(orderItem);
      console.log(this.data);
      if (this.data.OrderItemIndex == null)
        this.service.orderItems.push(orderItem);
      else this.service.orderItems[this.data.OrderItemIndex] =orderItem;
      this.dialogRef.close();

    }
  }

  validateForm(formData) {
    this.isValid = true;
    console.log("**********forme validation***********");
    console.log(formData);
    if (formData.OrderItemID== 0) this.isValid = false;
    else if (formData.Quantity == 0) this.isValid = false;
     else if(formData.Quantity  > formData.item.stock){

     this.isValid = false;
      this.errorMessage = "Il ne reste que "+formData.item.stock+" pièces dans le stock.";
     }
    return this.isValid;
  }

  close() {
    this.dialogRef.close();
  }
}
