import { getDbUsers, addDbCustomer, getDbProduit } from "../dal/db";
import { type Customer, type Produit } from '../interfaces';

export async function getUsers(): Promise<Customer[]> {
  return await getDbUsers();
}

export async function getProduits(): Promise<Produit[]> {
  return await getDbProduit();
}

/**
 * Add a user to the database : warning, does not check if user already exists
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