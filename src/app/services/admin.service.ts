import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../model/user';
import {Product} from '../model/product';
import {environment} from "../../environments/environment";
import {Facture} from "../model/facture";
import {LigneFacture} from "../model/ligne-facture";

let API_URL = "http://localhost:7900/api/admin/";
let API_URL2 = "http://localhost:7900/api/user/";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  currentUser: User;
  headers: HttpHeaders;
  formData: Facture = new Facture();
  orderItems: LigneFacture[];
  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }
   createUser(user: User): Observable<any> {
    return this.http.post(API_URL + "client-create", JSON.stringify(user),
  {headers: this.headers});
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(API_URL + "client-update", JSON.stringify(user),
  {headers: this.headers});
  }

  deleteUser(user: User): Observable<any> {
    return this.http.post(API_URL + "client-delete", JSON.stringify(user),
  {headers: this.headers});
  }

  getUser(id): Observable<any> {
    return this.http.get(API_URL2 + "id/"+id);
  }

  findAllUsers(): Observable<any> {
    return this.http.get(API_URL + "client-all",
  {headers: this.headers});
  }

  numberOfUsers(): Observable<any> {
    return this.http.get(API_URL + "client-number",
  {headers: this.headers});
  }

  
  createProduct(product: Product): Observable<any> {
    return this.http.post(API_URL + "produit-create", JSON.stringify(product),
  {headers: this.headers});
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(API_URL + "produit-update", JSON.stringify(product),
  {headers: this.headers});
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.post(API_URL + "produit-delete", JSON.stringify(product),
  {headers: this.headers});
  }

  findAllProducts(): Observable<any> {
    return this.http.get(API_URL + "produit-all",
  {headers: this.headers});
  }

  numberOfProducts(): Observable<any> {
    return this.http.get(API_URL + "produit-number",
  {headers: this.headers});
  }

  
  findAllTransactions(): Observable<any> {
    return this.http.get(API_URL + "commande-all",
   {headers: this.headers});
  }

  numberOfTransactions(): Observable<any> {
    return this.http.get(API_URL + "commande-number",
  {headers: this.headers});
  }



  saveOrUpdateOrder():Observable<any> {

    
      this.formData.ligne_factures = this.orderItems;
     
       this.getUser(this.formData.client.id).subscribe(data=>{
          console.log("****************User**********");
       console.log(data);
       this.formData.client = data as User;
       })


  console.log("******************FORMDATA****************************");

    console.log(this.formData.client)
         
        let body = {
           "numero": this.formData.numero ,
           "ref":  this.formData.ref  ,
           "date_fact": this.formData.date_fact,
          "client": this.formData.client,
           "methodP": this.formData.methodP ,
           "gtotal": this.formData.gTotal,
           "deletedOrderItemIDs":this.formData.deletedOrderItemIDs ,
           "ligne_factures": this.formData.ligne_factures
         };

         console.log("******************Body****************************");

    console.log(body)


  
   

    return this.http.post("http://localhost:7900/mediatek-api/facture/", JSON.stringify(body),
      {headers: this.headers});
  }

  getOrderList(): Observable<any>{
     return this.http.get(API_URL + "commandes-all",
   {headers: this.headers});
  }

  getOrderByID(id:number):Observable<any> {
    return this.http.get("http://localhost:7900/mediatek-api/facture/"+id);
  }

  deleteOrder(facture):Observable<any> {
     return this.http.post(API_URL + "facture-delete", JSON.stringify(facture),
  {headers: this.headers});

  }

  updateOrder(order): Observable<any> {
    return this.http.put(API_URL + "facture-update", JSON.stringify(order),
  {headers: this.headers});
  }

  findAllChiffre(): Observable<any> {
    return this.http.get("http://localhost:7900/mediatek-api/chiffre/",
   {headers: this.headers});
  }


  findAllAudit(): Observable<any> {
    return this.http.get("http://localhost:7900/mediatek-api/audit_stock/",
   {headers: this.headers});
  }
 

  findAllDemande(id:number):Observable<any> {
    return this.http.get("http://localhost:7900/mediatek-api/produit/demande/"+id);
  }

}
