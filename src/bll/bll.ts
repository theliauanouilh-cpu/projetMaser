//#region Import
import { getDbUsers, addDbCustomer, getDbProduct } from "../dal/db";
import { type Customer, type productResults } from '../interfaces';
//#endregion

//#region function
export async function getUsers(): Promise<Customer[]> {
  return await getDbUsers();
}

export async function getProducts(categories: string[], offset: number, limit: number): Promise<productResults> {
  return await getDbProduct(categories, offset, limit);
}

/**
 * Add a customer to the database
 * @returns Newly created userId
 */
export async function addCustomer(
  name: string,
  phone: string,
  email: string,
  address: string,
  city: string,
  postalCode: string,
  password: string
): Promise<number> {
  return await addDbCustomer(name, phone, email, address, city, postalCode, password);
}
//#endregion
