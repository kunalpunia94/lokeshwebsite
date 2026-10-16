const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");

function page() {
  return fs.readFileSync("index.html", "utf8");
}

function script() {
  return fs.readFileSync("script.js", "utf8");
}

test("the browse page has a place for every grouped cracker section", () => {
  assert.match(page(), /id="allProductsMount"/);
});

test("category tiles and product search use the browse-all navigation", () => {
  const source = script();
  assert.match(source, /function showBrowseAll\(\)/);
  assert.match(source, /function scrollToCategory\(secId\)/);
  assert.match(source, /scrollToCategory\(section\.id\)/);
  assert.match(source, /function revealAllCards\(\)/);
  assert.doesNotMatch(source, /Object\.values\(sectionById\)\.forEach\(sec=> sec\.hidden = true\)/);
});
