import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {AdminService} from "../../../services/admin.service";
import {Facture} from '../../../model/facture';
import * as jsPDF from 'node_modules/jspdf';
import { DatePipe } from '@angular/common';
import 'jspdf-autotable';
 declare var $: any;
@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styles: []
})
export class OrdersComponent implements OnInit {
  orderList:Array<Facture>;
  selectedFacture: Facture = new Facture();
  errorMessage: string;
  infoMessage: string;
  constructor(
    private service: AdminService,
    private router: Router,
    private toastr: ToastrService,
     public datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.refreshList();
  }
  refreshList() {
    this.service.getOrderList().subscribe(res => {
    console.log("***********************Oders**********");
    console.log(res);
    this.orderList = res;

    });
  }


   rList(orders){
       this.orderList = orders;
   }
  openForEdit(orderID: number) {
    this.router.navigate(["/order/edit/" + orderID]);
  }

    editOrderRequest(facture) {
    this.selectedFacture = facture;
    console.log(facture);
    $("#orderModal").modal('show');
  }

  editOrder(){
    this.service.updateOrder(this.selectedFacture).subscribe(data => {
      let itemIndex = this.orderList.findIndex(item => item.numero == this.selectedFacture.numero);
      this.orderList[itemIndex] = this.selectedFacture;
       this.rList(this.orderList);
      this.infoMessage = "Mission is completed.";
      $("#orderModal").modal('hide');
    },err => {
      if(err.status === 409){
        this.errorMessage = "login doit être unique.";
      }else{
        this.errorMessage = "Erreur inattendue.";
      }
    });
  }



  onOrderDelete(facture) {
    if(confirm("Etes-vous sûr de le supprimer?"))
    this.service.deleteOrder(facture).subscribe(res => {
      this.refreshList();
      this.toastr.warning("Deleted Successfull", "Restaurent App.");
    });
  }

  onDownload(facture:any) {
    let array2d = new Array(facture.ligne_factures.length);
    for (let i = 0; i < facture.ligne_factures.length; i++) {
      array2d[i] = new Array(5);
    }
     console.log("***********************Oder facture**********");
    console.log(facture);
    console.log(facture.ligne_factures.length);
    console.log("//////////////////////");
    for (let i = 0; i < facture.ligne_factures.length; i++) {
      array2d[i][0] = facture.ligne_factures[i].id;
      array2d[i][1] = facture.ligne_factures[i].produit.libelle;
      array2d[i][2] = facture.ligne_factures[i].produit.prix;
      array2d[i][3] = facture.ligne_factures[i].quantite;
      array2d[i][4] = facture.ligne_factures[i].total;
    }
    console.log('/////////////////////////////');
    console.table(array2d);
    console.log(array2d);
     const doc = new jsPDF(), margin = 5;
    doc.setFont('courier');
    doc.setFontType('bolditalic');
    doc.setFontSize(22);
    doc.setTextColor(96,96,96);
    doc.text(50, 25, 'Votre facture - Mediatek');
    doc.setFont('courier');
    doc.setFontType('normal');
    doc.setFontSize(19);
        doc.text(20, 40, 'Réf:' + facture.ref);
    doc.setDrawColor(0, 0, 250);
    doc.setLineWidth(1.5);
    doc.line(20, 45, 200, 45);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.text(20, 60, 'Nom & Prenom:');
    doc.setFont('courier')
    doc.setFontType('normal')
    doc.text(60, 60, facture.client.nom + ' ' + facture.client.prenom);
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.text(20, 70, 'Adresse :');
    doc.setFont('courier');
    doc.setFontType('normal');
    doc.text(50, 70, facture.client.adresse);
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.text(20, 80, 'Telephone :');
    doc.setFont('courier');
    doc.setFontType('normal');
     doc.text(50, 80, facture.client.tel);
     doc.text(150, 60, 'Date:');
    doc.setFont('courier');
    doc.setFontType('bolde');
    doc.text(170, 60,this.datepipe.transform(facture.date_fact, 'dd/MM/yyyy'));//slice(0,10)
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.text(90, 95, 'Produits Commandés :');
    doc.setDrawColor(0, 0, 250);
    doc.setLineWidth(0.5);
    doc.line(100, 98, 119, 98);
    doc.autoTable({html: '#my-table'})

    doc.autoTable({
      head: [['#No CMD', 'Produit','Prix', 'Quantite', 'Total'],],
      columnStyles: {0: {halign: 'center', fillColor: [220, 220, 220]}},
      startY: 110,
      body: array2d,
    });
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.text(150,170, 'Total :');
    doc.setFont('courier')
    doc.setFontType('normal')
    doc.text(170,170, facture.gtotal+' DHS');
    doc.save('facture.pdf');
  }
}
