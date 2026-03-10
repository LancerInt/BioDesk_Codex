import * as SQLite from 'expo-sqlite';
import { seedProducts } from '../data/seedData';

const db = SQLite.openDatabaseSync('biodesk.db');

export function initializeDatabase() {
  db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sku TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      active_ingredient TEXT NOT NULL,
      category TEXT,
      description TEXT
    );

    CREATE VIRTUAL TABLE IF NOT EXISTS products_fts USING fts5(
      name,
      active_ingredient,
      content='products',
      content_rowid='id'
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      clinic_name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      interest TEXT,
      created_at TEXT NOT NULL
    );
  `);

  syncFts();
}

function syncFts() {
  db.execSync(`
    DELETE FROM products_fts;
    INSERT INTO products_fts(rowid, name, active_ingredient)
    SELECT id, name, active_ingredient FROM products;
  `);
}

export function importSeedData() {
  const insertProduct = db.prepareSync(
    'INSERT OR REPLACE INTO products (sku, name, active_ingredient, category, description) VALUES (?, ?, ?, ?, ?);',
  );

  try {
    db.execSync('BEGIN TRANSACTION;');
    seedProducts.forEach((product) => {
      insertProduct.executeSync([
        product.sku,
        product.name,
        product.activeIngredient,
        product.category,
        product.description,
      ]);
    });
    db.execSync('COMMIT;');
    syncFts();
  } catch (error) {
    db.execSync('ROLLBACK;');
    throw error;
  } finally {
    insertProduct.finalizeSync();
  }
}

export function getProducts() {
  return db.getAllSync('SELECT * FROM products ORDER BY name ASC;');
}

export function getProductById(id) {
  return db.getFirstSync('SELECT * FROM products WHERE id = ?;', [id]);
}

export function searchProducts(query) {
  if (!query.trim()) {
    return getProducts();
  }

  return db.getAllSync(
    `
    SELECT p.*
    FROM products_fts f
    INNER JOIN products p ON p.id = f.rowid
    WHERE products_fts MATCH ?
    ORDER BY rank;
    `,
    [`${query.trim()}*`],
  );
}

export function saveLead(lead) {
  db.runSync(
    `
    INSERT INTO leads (full_name, clinic_name, phone, email, interest, created_at)
    VALUES (?, ?, ?, ?, ?, ?);
    `,
    [
      lead.fullName,
      lead.clinicName,
      lead.phone,
      lead.email,
      lead.interest,
      new Date().toISOString(),
    ],
  );
}

export function getLeadsCount() {
  const result = db.getFirstSync('SELECT COUNT(*) as total FROM leads;');
  return result?.total ?? 0;
}
