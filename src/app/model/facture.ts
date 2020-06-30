import {User} from "./user";
import {LigneFacture} from "./ligne-facture";
export class Facture {
  numero: number;
  ref: string = "";
  date_fact:Date = new Date();
  client:User = new User();
  methodP: string = "";
  gTotal: number = 0;
  ligne_factures:LigneFacture[];
  deletedOrderItemIDs: string;
}
