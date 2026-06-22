//#region import
import { Dexie, type EntityTable } from 'dexie';
import { type Customer, type product, type productResults} from '../interfaces'
import productList from '../../data/products.json';
//#endregion


//#region Init
const db = new Dexie('SofaLandDatabase') as Dexie & {
  customers: EntityTable<Customer, 'id'>;
  products: EntityTable<product, 'id'>;
};

db.version(1).stores({
  customers: '++id, name, email, password, address, city, postalCode, phone',
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
  phone: string,
  email: string,
  address: string,
  city: string,
  postalCode: string,
  password: string,
): Promise<number> {
  const customerExists = await db.customers.where({ email: email, password: password }).toArray()

  console.log(customerExists)
  if (customerExists.length > 0) {
    throw new Error('Customer exists already')
  }

  return await db.customers.add({
    name,
    phone,
    email,
    address,
    city,
    postalCode,
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
async function getDbProduct(categories: string[], offset: number, limit: number): Promise<productResults> {

  console.log('getDbProduct', categories)

  const totalProducts = categories.length ?
                          await db.products
                                .where('category')
                                .anyOf(categories)
                                .count() :
                          await db.products.count()


  const products = categories.length ?
                      await db.products
                              .where('category')
                              .anyOf(categories)
                              .offset(offset)
                              .limit(limit)
                              .toArray() :
                      await db.products
                              .offset(offset)
                              .limit(limit)
                              .toArray()

  return {
    products     : products,
    totalProducts: totalProducts
  }
}




//#endregion

export { db, addDbCustomer, getDbUsers, Initproduct, getDbProduct };
