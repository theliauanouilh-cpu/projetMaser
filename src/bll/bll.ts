//#region Import
import { getDbUsers, addDbCustomer, getDbproduct } from "../dal/db";
import { type Customer, type product } from '../interfaces';
//#endregion

//#region function
export async function getUsers(): Promise<Customer[]> {
  return await getDbUsers();
}

export async function getproducts(): Promise<product[]> {
  return await getDbproduct();
}

/**
 * Add a customer to the database
 * @returns Newly created userId
 */
export async function addCustomer(
  name: string,
  telephone: string,
  email: string,
  adresse: string,
  ville: string,
  codePostal: string,
  password: string
): Promise<number> {
  return await addDbCustomer(name, telephone, email, adresse, ville, codePostal, password);
}
//#endregion
