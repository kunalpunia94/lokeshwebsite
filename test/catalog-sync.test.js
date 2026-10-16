const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");
const supplier = require("./fixtures/renuga-2026-10-16.json");

function catalog() {
  const source = fs.readFileSync("script.js", "utf8");
  const start = source.indexOf("const CATALOG =");
  const end = source.indexOf("const byCode", start);
  return vm.runInNewContext(`${source.slice(start, end)}; CATALOG`);
}

function products() {
  return catalog().flatMap(([, items]) => items);
}

test("non-exempt catalogue exactly matches the newer Renuga snapshot in both directions", () => {
  const actual = catalog().filter(([cat]) => !["Combo Packs", "Gift Boxes"].includes(cat))
    .flatMap(([cat, items]) => items.map(([code]) => `${cat}:${code}`)).sort();
  const expected = supplier.products.map(item => `${item.category}:${item.code}`).sort();
  assert.deepEqual(Array.from(actual), expected);
  assert.equal(new Set(products().map(([code]) => code)).size, products().length, "codes must be unique");
});

test("new and replacement products use supplier selling price plus five percent; retained prices are unchanged", () => {
  const items = new Map(products().map(item => [item[0], item]));
  for (const item of supplier.products) {
    const expected = item.incoming ? Math.round(item.supplierPrice * 105) / 100 : item.expectedPrice;
    assert.equal(items.get(item.code)?.[3], expected, `${item.name} price`);
  }
});

test("every rendered product image exists and newly downloaded images are valid WebP files", () => {
  const source = fs.readFileSync("script.js", "utf8");
  const photo = vm.runInNewContext(source.slice(source.indexOf("const PRODUCT_PHOTO_CODES"), source.indexOf("function totals")) + "; productPhoto");
  for (const [code, name] of products()) {
    const path = decodeURI(photo(code, name));
    if (path) assert.equal(fs.existsSync(path), true, `${name}: ${path}`);
  }
  for (const item of supplier.products.filter(item => item.incoming)) {
    assert.equal(photo(item.code, itemsName(item.code)), item.imagePath || "");
    if (item.imagePath) {
      const bytes = fs.readFileSync(item.imagePath);
      assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
      assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
    }
  }
  function itemsName(code) { return products().find(item => item[0] === code)[1]; }
});

test("Combo Packs and Gift Boxes retain their existing products and prices", () => {
  const groups = new Map(catalog());
  assert.deepEqual(Array.from(groups.get("Combo Packs"), item => item[3]), [3999, 5999, 9999]);
  assert.deepEqual(Array.from(groups.get("Gift Boxes"), item => item[3]), [261.25, 400, 625, 750, 975, 1200]);
});
