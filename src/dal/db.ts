//#region import
import { Dexie, type EntityTable } from 'dexie';
import { type Customer, type product} from '../interfaces'
import productList from '../../data/products.json';
//#endregion


//#region Init
const db = new Dexie('SofaLandDatabase') as Dexie & {
  customers: EntityTable<Customer, 'id'>;
  products: EntityTable<product, 'id'>;
};

db.version(1).stores({
  customers: '++id, name, email, password, adresse, city, codePostal, telephone',
  products: 'id, nom, price, slide, images, category, description, size'
});
//#endregion


//#region Functions
/**
 * Add a customer to the database
 * @returns Newly created customerId
 */
async function addDbCustomer(
  name: string,
  telephone: string,
  email: string,
  adresse: string,
  city: string,
  codePostal: string,
  password: string,
): Promise<number> {
  const customerExists = await db.customers.where({ email: email, password: password }).toArray()

  console.log(customerExists)
  if (customerExists.length > 0) {
    throw new Error('Customer exists already')
  }

  return await db.customers.add({
    name,
    telephone,
    email,
    adresse,
    city,
    codePostal,
    password
  });
}

/**
 * Initialize products in the database
 */
async function Initproduct(): Promise<void> {
  const count = await db.products.count();

  if (count > 0) return;

  await db.products.bulkPut(productList);
}

/**
 * Get all customers
 */
async function getDbUsers(): Promise<Customer[]> {
  return await db.customers.toArray();
}

/**
 * Get all products
 */
async function getDbproduct(): Promise<product[]> {
  return await db.products.toArray();
}
//#endregion

export { db, addDbCustomer, getDbUsers, Initproduct, getDbproduct };
