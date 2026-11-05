import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { dressCategories, dressDesignCount, products } from "../lib/products.ts";

test("the dress catalog exposes one pictured listing per design across every category", () => {
  assert.equal(dressDesignCount, 55);
  assert.equal(products.length, dressDesignCount);
  assert.equal(new Set(products.map((product) => product.name)).size, products.length);
  assert.deepEqual(
    [...new Set(products.map((product) => product.category))].sort(),
    [...dressCategories].sort(),
  );
});

test("every catalog product has complete shopping details and an image", () => {
  for (const product of products) {
    assert.ok(product.name);
    assert.ok(product.priceValue >= 1000 && product.priceValue < 5000, `${product.name} price must be ₹1,000–₹4,999`);
    assert.ok(product.image.startsWith("/images/"));
    assert.ok(product.gallery.length > 0);
    assert.ok(product.fabric);
    assert.ok(product.craft);
    assert.ok(product.sizes.length > 0);
  }
});

test("each dress design has its own bundled, category-selected product photo", () => {
  const imagePaths = new Set(products.map((product) => product.image));
  assert.equal(imagePaths.size, dressDesignCount);

  for (const product of products) {
    assert.ok(existsSync(resolve("public", product.image.slice(1))), product.image);
    assert.deepEqual(product.gallery, [product.image]);
  }
});
