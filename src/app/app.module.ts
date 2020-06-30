import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { UnathorizedComponent } from './components/error/unathorized/unathorized.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import {
  MatButtonModule, MatCardModule,
  MatInputModule, MatListModule,
  MatToolbarModule, MatSelectModule,
  MatFormFieldModule, MatTableModule,
  MatPaginatorModule, MatSortModule,
  MatProgressBarModule, MatIconModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FacturationComponent } from './components/admin/facturation/facturation.component';
import {OrderItemsComponent} from "./components/admin/orders/order-items/order-items.component";
import {OrderComponent} from "./components/admin/orders/order/order.component";
import {OrdersComponent} from "./components/admin/orders/orders.component";

import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule} from "ngx-toastr";
import { AuditComponent } from './components/admin/audit/audit.component';
import { ChiffreComponent } from './components/admin/chiffre/chiffre.component';
import { DemandeComponent } from './components/admin/demande/demande.component';
import { StatistiqueComponent } from './components/admin/statistique/statistique.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    UserListComponent,
    ProductListComponent,
    UserTemplateComponent,
    AdminTemplateComponent,
    NotFoundComponent,
    UnathorizedComponent,
     OrdersComponent,
     OrderComponent,
    OrderItemsComponent,
    FacturationComponent,
    AuditComponent,
    ChiffreComponent,
    DemandeComponent,
    StatistiqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
     NgxSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[OrderItemsComponent],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
