import { productsURL } from './config';
import { IProduct } from './interfaces';

export async function getProducts(): Promise<IProduct[]> {
  const response: Response = await fetch(productsURL);
  const products: IProduct[] = await response.json();
  return products;
}
