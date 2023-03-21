import { tigrisClient } from '../lib/tigris'
import { Product } from '../db/models/product'
import productsJSON from "../db/products.json"

async function main() {
  const db = tigrisClient.getDatabase();
  await db.initializeBranch();

  const collection = await db.createOrUpdateCollection<Product>(Product);
  console.log("Collection created ...");

  const products = productsJSON as Array<Product>;
  await collection.insertOrReplaceMany(products);
  console.log("Seeding complete ...");
}

main().then(async () => {
  console.log("Setup complete ...");
  process.exit(0);
}).catch(async (e) => {
  console.error(e);
  process.exit(1);
})
