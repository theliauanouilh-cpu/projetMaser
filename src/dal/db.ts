import { Dexie, type EntityTable } from 'dexie';
import { type Customer, type Produit} from '../interfaces'
import productList from '../../data/products.json';

//#region Interfaces

//#endregion

//#region Init
const db = new Dexie('SofaLandDatabase') as Dexie & {
  customers: EntityTable<Customer, 'id'>;
  produits: EntityTable<Produit, 'id'>;
};

db.version(1).stores({
  customers: '++id, name, email, password, adresse, ville, codePostal, telephone',
  produits: 'id, nom, prix, slide, images, categorie, description, taille'
});
//#endregion

//#region Functions
/**
 * Add a user to the database : warning, does not check if user already exists
 * @returns Newly created userId
 */
async function addDbCustomer(
  name       : string,
  telephone  : string,
  email      : string,
  adresse    : string,
  ville      : string,
  codePostal : string,
  password   : string,
): Promise<number> {
  const customerExists = await db.customers.where({email: email, password: password }).toArray()

  console.log(customerExists)
  if (customerExists.length > 0) {
    throw new Error('Customer exists already')
  }

  return await db.customers.add({
    name,
    telephone,
    email,
    adresse,
    ville,
    codePostal,
    password
  });
}

async function InitProduit(): Promise<void> {
  const count = await db.produits.count();

  if (count > 0) return;

  await db.produits.bulkPut(productList);
}



async function getDbUsers(): Promise<Customer[]> {
  return await db.customers.toArray();
}

async function getDbProduit(): Promise<Produit[]>{
  return await db.produits.toArray();
}
//#endregion

export { db, addDbCustomer, getDbUsers, InitProduit, getDbProduit };
