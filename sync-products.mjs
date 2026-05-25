/**
 * SILIQ Product Sync
 * 
 * Run: npm run sync-products
 * 
 * FOLDER STRUCTURE:
 * ─────────────────
 * products/
 * ├── rings/
 * │   ├── Solis Signet Ring__3499__4499__6__5-6-7-8-9__SKU001/
 * │   │   ├── 1.jpg
 * │   │   ├── 2.jpg
 * │   │   └── 3.jpg
 * │   └── Orion Band Ring__2999__0__10__5-6-7-8__SKU002/
 * │       ├── 1.jpg
 * │       └── 2.jpg
 * ├── necklaces/
 * │   └── Luna Chain Necklace__4299__5299__15__none__SKU003/
 * │       ├── 1.jpg
 * │       └── 2.jpg
 * ├── earrings/
 * ├── bracelets/
 * ├── anklets/
 * └── pendants/
 * 
 * FOLDER NAME FORMAT:
 * ───────────────────
 * {Name}__{Price}__{MRP (0 if no discount)}__{Quantity}__{Sizes (dash-separated or "none")}__{SKU}
 * 
 * Example: "Mira Stacking Ring__1799__0__25__5-6-7-8-9__SKU009"
 *   → Name: Mira Stacking Ring
 *   → Price: ₹1,799
 *   → MRP: none (no discount)
 *   → Quantity: 25
 *   → Sizes: 5, 6, 7, 8, 9
 *   → SKU: SKU009
 * 
 * IMAGES:
 * ───────
 * Put images (jpg/png/webp) inside each product folder.
 * They'll be copied to public/products/{slug}/ and referenced automatically.
 * Name them 1.jpg, 2.jpg, etc. for ordering.
 * 
 * WHAT IT DOES:
 * ─────────────
 * 1. Scans the /products folder
 * 2. Copies images to /public/products/{slug}/
 * 3. Generates src/lib/data.ts with all products
 * 4. Updates public/sitemap.xml
 */

import { readdirSync, statSync, existsSync, mkdirSync, copyFileSync, writeFileSync } from 'fs';
import { join, extname } from 'path';

const PRODUCTS_DIR = 'products';
const PUBLIC_DIR = 'public/products';
const DATA_FILE = 'src/lib/data.ts';
const SITEMAP_FILE = 'public/sitemap.xml';
const DOMAIN = 'https://siliq.co';

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '').replace(/^-+/, '');
}

function parseProductFolder(folderName) {
  const parts = folderName.split(' - ');
  if (parts.length < 6) {
    console.warn(`  ⚠ Skipping "${folderName}" — expected format: Name - Price - MRP - SKU - Quantity - Sizes`);
    return null;
  }
  const [name, price, mrp, sku, quantity, sizesStr] = parts;
  const sizes = sizesStr.trim().toLowerCase() === 'none' ? null : sizesStr.trim().split('-');
  return {
    name: name.trim(),
    price: parseInt(price),
    originalPrice: parseInt(mrp) > 0 ? parseInt(mrp) : undefined,
    quantity: parseInt(quantity),
    sizes,
    sku: sku.trim(),
  };
}

function scanProducts() {
  if (!existsSync(PRODUCTS_DIR)) {
    mkdirSync(PRODUCTS_DIR);
    console.log(`📁 Created /${PRODUCTS_DIR}/ folder. Add your category folders inside it.`);
    return [];
  }

  const categories = readdirSync(PRODUCTS_DIR).filter(f => 
    statSync(join(PRODUCTS_DIR, f)).isDirectory() && !f.startsWith('.')
  );

  const products = [];
  let id = 1;

  for (const category of categories) {
    const categoryPath = join(PRODUCTS_DIR, category);
    const productFolders = readdirSync(categoryPath).filter(f =>
      statSync(join(categoryPath, f)).isDirectory() && !f.startsWith('.')
    );

    for (const folder of productFolders) {
      const parsed = parseProductFolder(folder);
      if (!parsed) continue;

      const slug = slugify(parsed.name);
      const folderPath = join(categoryPath, folder);

      // Get images
      const imageFiles = readdirSync(folderPath)
        .filter(f => IMAGE_EXTS.includes(extname(f).toLowerCase()))
        .sort();

      if (imageFiles.length === 0) {
        console.warn(`  ⚠ No images in "${folder}" — skipping`);
        continue;
      }

      // Copy images to public
      const publicProductDir = join(PUBLIC_DIR, slug);
      if (!existsSync(publicProductDir)) mkdirSync(publicProductDir, { recursive: true });

      const imagePaths = [];
      for (const img of imageFiles) {
        const dest = join(publicProductDir, img);
        copyFileSync(join(folderPath, img), dest);
        imagePaths.push(`/products/${slug}/${img}`);
      }

      products.push({
        id: String(id++),
        name: parsed.name,
        slug,
        price: parsed.price,
        originalPrice: parsed.originalPrice,
        category,
        tags: [],
        sizes: parsed.sizes,
        images: imagePaths,
        description: `${parsed.name} — crafted in 925 sterling silver.`,
        details: ['925 Sterling Silver', 'BIS Hallmarked', `SKU: ${parsed.sku}`],
        rating: 4.5,
        reviews: 0,
        inStock: parsed.quantity > 0,
        isNew: true,
        sku: parsed.sku,
        quantity: parsed.quantity,
      });

      console.log(`  ✓ ${parsed.name} (${category}) — ${imageFiles.length} images`);
    }
  }

  return products;
}

function generateDataFile(products) {
  const productsStr = products.map(p => {
    const lines = [
      `    id: "${p.id}", name: "${p.name}", slug: "${p.slug}", price: ${p.price},${p.originalPrice ? ` originalPrice: ${p.originalPrice},` : ''}`,
      `    category: "${p.category}", tags: [${p.tags.map(t => `"${t}"`).join(', ')}],${p.sizes ? ` sizes: [${p.sizes.map(s => `"${s}"`).join(', ')}],` : ''}`,
      `    images: [${p.images.map(i => `"${i}"`).join(', ')}],`,
      `    description: "${p.description}",`,
      `    details: [${p.details.map(d => `"${d}"`).join(', ')}],`,
      `    rating: ${p.rating}, reviews: ${p.reviews}, inStock: ${p.inStock},${p.isNew ? ' isNew: true,' : ''}`,
    ];
    return `  {\n${lines.join('\n')}\n  }`;
  }).join(',\n');

  const file = `export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  images: string[];
  description: string;
  details: string[];
  sizes?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
};

export const categories = [
  { name: "All", slug: "all" },
  { name: "Rings", slug: "rings" },
  { name: "Necklaces", slug: "necklaces" },
  { name: "Earrings", slug: "earrings" },
  { name: "Bracelets", slug: "bracelets" },
  { name: "Anklets", slug: "anklets" },
  { name: "Pendants", slug: "pendants" },
];

export const products: Product[] = [
${productsStr}
];

export const testimonials = [
  { name: "Priya S.", location: "Mumbai", text: "The quality is incredible for the price. My Luna necklace hasn't tarnished even after months of daily wear.", rating: 5 },
  { name: "Ananya R.", location: "Delhi", text: "I ordered the Mira stacking rings and they're perfect. Delicate, elegant, and so comfortable.", rating: 5 },
  { name: "Kavya M.", location: "Bangalore", text: "SILIQ's packaging is beautiful — felt like opening a luxury gift. The earrings are stunning.", rating: 5 },
  { name: "Riya P.", location: "Pune", text: "Best silver jewellery brand I've found online. The craftsmanship is visible in every piece.", rating: 5 },
  { name: "Meera K.", location: "Chennai", text: "Ordered a custom engraved ring for my anniversary. The team was so helpful and the result was perfect.", rating: 5 },
  { name: "Sneha D.", location: "Hyderabad", text: "Fast shipping, gorgeous pieces, and the customer service is amazing. Customer for life!", rating: 5 },
];

export const collections = [
  { name: "Rings", slug: "rings", img: "${products.find(p => p.category === 'rings')?.images[0] || '/products/placeholder.jpg'}", count: ${products.filter(p => p.category === 'rings').length} },
  { name: "Necklaces", slug: "necklaces", img: "${products.find(p => p.category === 'necklaces')?.images[0] || '/products/placeholder.jpg'}", count: ${products.filter(p => p.category === 'necklaces').length} },
  { name: "Earrings", slug: "earrings", img: "${products.find(p => p.category === 'earrings')?.images[0] || '/products/placeholder.jpg'}", count: ${products.filter(p => p.category === 'earrings').length} },
  { name: "Bracelets", slug: "bracelets", img: "${products.find(p => p.category === 'bracelets')?.images[0] || '/products/placeholder.jpg'}", count: ${products.filter(p => p.category === 'bracelets').length} },
  { name: "Anklets", slug: "anklets", img: "${products.find(p => p.category === 'anklets')?.images[0] || '/products/placeholder.jpg'}", count: ${products.filter(p => p.category === 'anklets').length} },
];
`;

  writeFileSync(DATA_FILE, file);
}

function updateSitemap(products) {
  const productUrls = products.map(p => 
    `  <url><loc>${DOMAIN}/product/${p.slug}</loc><priority>0.8</priority></url>`
  ).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${DOMAIN}/</loc><priority>1.0</priority></url>
  <url><loc>${DOMAIN}/shop</loc><priority>0.9</priority></url>
  <url><loc>${DOMAIN}/about</loc><priority>0.7</priority></url>
  <url><loc>${DOMAIN}/journal</loc><priority>0.7</priority></url>
  <url><loc>${DOMAIN}/contact</loc><priority>0.7</priority></url>
  <url><loc>${DOMAIN}/faq</loc><priority>0.6</priority></url>
  <url><loc>${DOMAIN}/shipping</loc><priority>0.5</priority></url>
  <url><loc>${DOMAIN}/size-guide</loc><priority>0.5</priority></url>
  <url><loc>${DOMAIN}/care-guide</loc><priority>0.5</priority></url>
  <url><loc>${DOMAIN}/account</loc><priority>0.5</priority></url>
  <url><loc>${DOMAIN}/privacy</loc><priority>0.3</priority></url>
  <url><loc>${DOMAIN}/terms</loc><priority>0.3</priority></url>
${productUrls}
</urlset>
`;
  writeFileSync(SITEMAP_FILE, sitemap);
}

// Run
console.log('\n🔄 SILIQ Product Sync\n');
console.log(`Scanning /${PRODUCTS_DIR}/...\n`);

const products = scanProducts();

if (products.length === 0) {
  console.log('\n📂 No products found. Create this folder structure:\n');
  console.log('products/');
  console.log('├── rings/');
  console.log('│   └── Solis Signet Ring__3499__4499__6__5-6-7-8-9__SKU001/');
  console.log('│       ├── 1.jpg');
  console.log('│       └── 2.jpg');
  console.log('├── necklaces/');
  console.log('├── earrings/');
  console.log('├── bracelets/');
  console.log('└── anklets/\n');
  console.log('Folder name format: Name__Price__MRP__Quantity__Sizes__SKU');
  console.log('  • MRP = 0 if no discount');
  console.log('  • Sizes = dash-separated (5-6-7-8) or "none"');
  console.log('  • Put product images (jpg/png/webp) inside each folder\n');
} else {
  generateDataFile(products);
  updateSitemap(products);
  console.log(`\n✅ Synced ${products.length} products!`);
  console.log(`   → ${DATA_FILE} updated`);
  console.log(`   → Images copied to /public/products/`);
  console.log(`   → Sitemap updated`);
  console.log(`   → Run "npm run build" to generate pages\n`);
}
