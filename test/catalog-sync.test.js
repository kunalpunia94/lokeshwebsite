const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");

function catalog() {
  const source = fs.readFileSync("script.js", "utf8");
  const start = source.indexOf("const CATALOG =");
  const end = source.indexOf("const byCode", start);
  return vm.runInNewContext(`${source.slice(start, end)}; CATALOG`);
}

function products() {
  return catalog().flatMap(([, items]) => items);
}

test("non-exempt catalogue removes Renuga-missing products", () => {
  const names = new Set(products().map(([, name]) => name));
  for (const name of ["Flower Pots Asoka", "Captain Morgan 3 1/2 20 spl crackling", "Mayur Father", "Super Heroes"]) {
    assert.equal(names.has(name), false, `${name} should not remain in the catalogue`);
  }
});

test("new Renuga products use a five-percent price uplift and have source images", () => {
  const items = new Map(products().map(item => [item[1], item]));
  const expected = new Map([
    ["Disco Shower", 71.4],
    ["Seeti mar whizzling 30 shot mini", 135.45],
    ["Sprite", 115.5],
    ["1kg Paper bomb", 176.4]
  ]);
  for (const [name, price] of expected) assert.equal(items.get(name)?.[3], price, `${name} price`);
  for (const image of [
    "images/214-Disco-Shower.webp", "images/177-Seeti-mar-whizzling-30-shot-mini.webp",
    "images/246-Sprite.webp", "images/247-Frooti.webp", "images/248-Fizz.webp",
    "images/249-Pepsi.webp", "images/250-Fanta.webp", "images/261-1kg-Paper-bomb.webp"
  ]) assert.equal(fs.existsSync(image), true, `${image} should be present`);
});

test("Combo Packs and Gift Boxes retain their existing products and prices", () => {
  const groups = new Map(catalog());
  assert.deepEqual(Array.from(groups.get("Combo Packs"), item => item[3]), [3999, 5999, 9999]);
  assert.deepEqual(Array.from(groups.get("Gift Boxes"), item => item[3]), [261.25, 400, 625, 750, 975, 1200]);
});
