/**
 * SILIQ Product Manager
 * 
 * Run: node add-product.mjs
 * 
 * This script helps you add products without editing code directly.
 * Fill in the details and it appends to src/lib/data.ts automatically.
 */

import { readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
  console.log('\n✨ SILIQ — Add New Product\n');

  const name = await ask('Product Name: ');
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
  console.log(`  → Slug: ${slug}`);

  const price = await ask('Price (₹): ');
  const originalPrice = await ask('Original Price (₹, leave blank if no discount): ');
  const category = await ask('Category (rings/necklaces/earrings/bracelets/anklets/pendants): ');
  const description = await ask('Description (1-2 sentences): ');

  const detailsRaw = await ask('Details (comma-separated, e.g. "925 Silver, 4g, 18 inch"): ');
  const details = detailsRaw.split(',').map(d => d.trim()).filter(Boolean);

  const sizesRaw = await ask('Sizes (comma-separated, e.g. "5,6,7,8" or leave blank): ');
  const sizes = sizesRaw ? sizesRaw.split(',').map(s => s.trim()) : null;

  const imagesRaw = await ask('Image URLs (comma-separated, paste full URLs): ');
  const images = imagesRaw.split(',').map(u => u.trim()).filter(Boolean);

  const isNew = (await ask('Is New Arrival? (y/n): ')).toLowerCase() === 'y';
  const isBestseller = (await ask('Is Bestseller? (y/n): ')).toLowerCase() === 'y';
  const rating = await ask('Rating (1-5, e.g. 4.7): ');
  const reviews = await ask('Number of reviews: ');

  // Read existing file
  const filePath = 'src/lib/data.ts';
  let content = readFileSync(filePath, 'utf-8');

  // Find the last product ID
  const idMatches = content.match(/id: "(\d+)"/g);
  const lastId = idMatches ? Math.max(...idMatches.map(m => parseInt(m.match(/\d+/)[0]))) : 0;
  const newId = String(lastId + 1);

  // Build product object
  const tags = [];
  if (isNew) tags.push('new');
  if (isBestseller) tags.push('bestseller');

  let product = `  {
    id: "${newId}", name: "${name}", slug: "${slug}", price: ${price},${originalPrice ? ` originalPrice: ${originalPrice},` : ''}
    category: "${category}", tags: [${tags.map(t => `"${t}"`).join(', ')}],${sizes ? ` sizes: [${sizes.map(s => `"${s}"`).join(', ')}],` : ''}
    images: [
      ${images.map(u => `"${u}"`).join(',\n      ')},
    ],
    description: "${description}",
    details: [${details.map(d => `"${d}"`).join(', ')}],
    rating: ${rating || '4.5'}, reviews: ${reviews || '0'}, inStock: true,${isNew ? ' isNew: true,' : ''}${isBestseller ? ' isBestseller: true,' : ''}
  },`;

  // Insert before the closing ];
  const insertPoint = content.lastIndexOf('];');
  content = content.slice(0, insertPoint) + product + '\n' + content.slice(insertPoint);

  writeFileSync(filePath, content);

  console.log(`\n✅ Product "${name}" added! (ID: ${newId})`);
  console.log(`   → View at: /product/${slug}`);
  console.log(`   → Don't forget to add to public/sitemap.xml`);
  console.log(`   → Run "npm run build" to generate the page\n`);

  rl.close();
}

main();
