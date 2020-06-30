import {Role} from './role';
export class User {
  id: number;
  nom: string="";
  prenom: string="";
  adresse: string="";
  date_naissance: Date;
  tel: string="";
  login: string="";
  password: string="";
  role: Role;
  token: string="";
}
