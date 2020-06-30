import {Facture} from "./facture";
import {Product} from "./product";

export class LigneFacture {
  id: number = 0;
  produit:Product= new Product();
  facture:Facture=new Facture();
  quantite: number = 0;
  total: number = 0;
}
