import { productsURL, FoodProduct, customersURL } from '../lib';

const prefix = '🐉 ';

interface HasId {
  id: number;
}

class GenericModel<T extends HasId> {
  public items: T[] | undefined;
  constructor(public url: string) {}

  async getItems(): Promise<T[]> {
    this.items = await getList<T>(this.url);
    return this.items;
  }

  getItemById(id: number): T | undefined {
    return this.items ? this.items.find((p) => (id = p.id)) : undefined;
  }
}

const foodModel = new GenericModel<FoodProduct>(productsURL);

export default async function updateOutput(id: string = 'output') {
  // const products = await getProducts();
  // const products = await getList<FoodProduct>(productsURL);
  const products = await foodModel.getItems();

  const output = document.querySelector(`#${id}`);
  const html = layoutProducts(products);

  if (output && html) {
    output.innerHTML = html;
  }
}

function layoutProducts(products: FoodProduct[]): string {
  const items = products.map(({ id, name, icon }) => {
    const productHtml = `
    <span class="card-id">#${id}</span>
      <i class="card-icon ${icon} fa-lg"></i>
    <span class="card-name">${name}</span>
    `;
    const cardHtml = `
    <li>
        <div class="card">
            <div class="card-content">
                <div class="content">
                ${productHtml}
                </div>
            </div>
        </div>
    </li>
    `;
    return cardHtml;
  });
  let productsHtml = `<ul>${items.join('')}</ul>`;
  return productsHtml;
}

async function getProducts(): Promise<FoodProduct[]> {
  const response: Response = await fetch(productsURL);
  const products: FoodProduct[] = await response.json();
  return products;
}

async function getList<T>(url: string): Promise<T[]> {
  const response: Response = await fetch(url);
  const items: T[] = await response.json();
  return items;
}

/************************************************
 * Learning sample code.
 ***********************************************/

runTheLearningSamples();

async function runTheLearningSamples() {
  function cheCosa_numero(arg: number): number {
    return arg;
  }

  function cheCosa_testo(arg: string): string {
    return arg;
  }

  function cheCosa<T>(arg: T): T {
    return arg;
  }

  console.log(cheCosa_numero(33));
  console.log(cheCosa_testo('Kalle Anka'));
  const n: number = cheCosa<number>(111);
  const s: string = cheCosa<string>('Il testo');
  const b: boolean = cheCosa<boolean>(true);
  console.log(n, s, b);

  interface ICustomer {
    id: number;
    name: string;
  }

  async function getData() {
    const customers = await getList<ICustomer>(customersURL);
    console.table(customers);
    const products = await getList<FoodProduct>(productsURL);
    console.table(products);
  }
  getData();

  interface IModel<T> {
    items: T[] | undefined;
    getItems: () => Promise<T[]>;
    getItemById: (id: number) => T | undefined;
  }

  class FoodModel implements IModel<FoodProduct> {
    public items: FoodProduct[] | undefined;
    public async getItems(): Promise<FoodProduct[]> {
      const items = await getList<FoodProduct>(productsURL);
      return items;
    }
    public getItemById(id: number): FoodProduct | undefined {
      const item = this.items?.find((i) => i.id === id);
      return item;
    }
  }
}
