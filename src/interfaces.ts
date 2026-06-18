export interface Customer {
  id         : number;
  name       : string;
  email      : string;
  address    : string;
  city      : string;
  postalCode : string;
  phone  : string;
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
