import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {UserListComponent} from './components/admin/user-list/user-list.component';
import {ProductListComponent} from './components/admin/product-list/product-list.component';
import {UnathorizedComponent} from './components/error/unathorized/unathorized.component';
import {NotFoundComponent} from './components/error/not-found/not-found.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './model/role';
import {OrdersComponent} from "./components/admin/orders/orders.component";
import {OrderComponent} from "./components/admin/orders/order/order.component";
import { AuditComponent } from './components/admin/audit/audit.component';
import { ChiffreComponent } from './components/admin/chiffre/chiffre.component';
import { DemandeComponent } from './components/admin/demande/demande.component';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard]
  },

  {path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
  },
  {path: 'user-list',
  component: UserListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
  },

   {path: 'audit',
  component: AuditComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
  },
   {path: 'chiffre',
  component: ChiffreComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
  },

 {path: 'demande',
  component: DemandeComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
  },



  {path: 'product-list',
  component: ProductListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
 },


  { path: "orders", component: OrdersComponent,
   canActivate: [AuthGuard],
 data: {roles: [Role.ADMIN]}
 },
  {
    path: "facture",
    children: [
      { path: "", component: OrderComponent },
      { path: "edit/:id", component: OrderComponent }
    ],
     canActivate: [AuthGuard],
 data: {roles: [Role.ADMIN]}
  },


  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnathorizedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
constructor(private router: Router) {
  this.router.errorHandler = (error: any) => {
    this.router.navigate(['/404']);
  }
}
}
