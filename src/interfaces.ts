export interface Customer {
  id         : number;
  name       : string;
  email      : string;
  adresse    : string;
  ville      : string;
  codePostal : string;
  telephone  : string;
  password   : string;
}

export interface product {
  id           : number;
  nom          : string;
  price         : number;
  slide        : number;
  images       : string[];
  category?   : string;
  description? : string;
  size?       : string;
}
