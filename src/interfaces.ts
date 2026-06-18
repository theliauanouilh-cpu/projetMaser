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
  prix         : number;
  slide        : number;
  images       : string[];
  categorie?   : string;
  description? : string;
  taille?       : string;
}
