import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {OrderItemsComponent} from "../order-items/order-items.component";
import {AdminService} from "../../../../services/admin.service";
import {User} from "../../../../model/user";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styles: []
})
export class OrderComponent implements OnInit {
  customerList: User[];
  isValid: boolean = true;

  constructor(
    private service: AdminService,
    private dialog: MatDialog,
    
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let orderID = this.currentRoute.snapshot.paramMap.get("id");
    if (orderID == null) this.resetForm();
    else {
      this.service.getOrderByID(parseInt(orderID)).subscribe(res => {
        this.service.formData = res.order;
        this.service.formData = res.orderDetails;
      });
    }
    this.service.findAllUsers().subscribe(res => (this.customerList = res as User[]));
  }

  resetForm(form?: NgForm) {
    if ((form = null)) form.resetForm();
    this.service.formData = {
      numero: null,
      ref: Math.floor(100000 + Math.random() * 900000).toString(),
      date_fact: new Date(),
      client: new User(),
      methodP: "",
      gTotal: 0,
      ligne_factures:null,
      deletedOrderItemIDs:""
    };
    this.service.orderItems = [];
  }

  AddOrEditOrderItem(OrderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    //dialogConfig.width = "20px";
    dialogConfig.data = { OrderItemIndex, OrderID };
    this.dialog
      .open(OrderItemsComponent, dialogConfig)
      .afterClosed()
      .subscribe(res => {
        this.updateGrandTotal();
      });
  }

  onDeleteEditOrderItem(orderItemID: number, i: number) {
    if(orderItemID!=null)
    this.service.formData.deletedOrderItemIDs+=orderItemID+","
    this.service.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }

  updateGrandTotal() {
    this.service.formData.gTotal = this.service.orderItems.reduce(
      (prev, curr) => {
        return prev + curr.total;
      },
      0
    );

    this.service.formData.gTotal = parseFloat(
      this.service.formData.gTotal.toFixed(2)
    );
  }

  validateForm() {
    this.isValid = true;
    if (this.service.formData.client.id == 0) this.isValid = false;
    else if (this.service.orderItems.length == 0) this.isValid = false;
    return this.isValid;
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateOrder().subscribe(res => {
        this.resetForm();
        this.toastr.success("Fomulaire soumis avec succès", "Mediatek");
        this.router.navigate(["/orders"]);
      });
    } else {
      this.toastr.warning("Erreur inattendue.", "Corriger !");
    }
  }
}
