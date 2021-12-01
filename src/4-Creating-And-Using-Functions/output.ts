import { productsURL } from '../lib';

const prefix: string = '🐉 ';

type ProductType = {
  id: number;
  name: string;
  icon?: string;
};

const sampleProducts = [
  {
    id: 10,
    name: 'Pizza',
  },
  {
    id: 20,
    name: 'Skies',
  },
  {
    id: 30,
    name: 'Shoes',
  },
];

export default async function updateOutput(id: string) {
  const products: ProductType[] = await fetchProducts();
  const output = document.querySelector(`#${id}`);
  if (output) {
    output.innerHTML = layoutProducts(products);
  }
}

function layoutProducts(products: ProductType[]): string {
  const cards: string[] = products.map((p) => {
    return `
      <div class="card">
        <span class="card-id">${p.id}</span>
        <i class="card-icon ${p.icon} fa-lg"></i>
        <span class="card-name">${p.name}</span>
      </div>
    `;
  });
  return cards.join('');
}

async function fetchProducts(): Promise<ProductType[]> {
  const response: Response = await fetch(productsURL);
  const products: ProductType[] = await response.json();
  return products;
}

runTheLearningSamples();

function runTheLearningSamples(): void {
  function displayProductInfo(id: number, name: string): void {
    console.log(`${prefix} typed parameters`);
    console.log(`Product id: ${id}, Product name: ${name}`);
  }

  displayProductInfo(1, 'Pizza');

  const declarationResult = sumDeclaration(4, 2);
  console.log('sumDeclaration result: ' + declarationResult);

  // Function declarations are hoisted
  function sumDeclaration(x: number, y: number): number {
    const sum = x + y;
    return sum;
  }

  // Function expressions are NOT hoisted
  const sumExpression = function (x: number, y: number): number {
    const sum: number = x + y;
    return sum;
  };

  const expressionResult = sumExpression(10, 30);
  console.log(`sumExpression result ${expressionResult}`);

  function getProductNames(): string[] {
    return sampleProducts.map((p) => p.name);
  }

  const productNames: string[] = getProductNames();
  console.log(`Product names: ${productNames}`);

  const getProductById = (id: number): ProductType | undefined =>
    sampleProducts.find((p) => p.id === id);

  const fetchedProduct = getProductById(10);
  console.log(`Fetched product name: ${fetchedProduct?.name}`);

  function buildAddress(
    street: string,
    city: string,
    ...restOfAddress: string[]
  ): string {
    return `${street} ${city} ${restOfAddress.join(' ')}`;
  }
  console.log(buildAddress('Fågelviksvägen 200', 'Norsborg', '14553'));
}
