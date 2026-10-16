const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");

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

test("live name search filters by prefix, hides empty categories, and restores all products", () => {
  const makeCard = code => ({dataset: {code}, style: {}, classList: {add() {}}});
  const gold = makeCard("1");
  const green = makeCard("2");
  const big = makeCard("3");
  const sectionById = {
    first: {querySelectorAll: () => [gold, big]},
    second: {querySelectorAll: () => [green]},
  };
  const message = {textContent: ""};
  const source = script();
  const start = source.indexOf("function filterCrackers(query){");
  const end = source.indexOf('productFinder.addEventListener("input"', start);
  const filter = vm.runInNewContext(`${source.slice(start, end)}; filterCrackers`, {
    sectionById,
    byCode: {"1": {name: "Gold Coin"}, "2": {name: "Green City"}, "3": {name: "Big Gold"}},
    productFinderMessage: message,
  });
  assert.equal(filter(" G "), 2);
  assert.equal(gold.style.display, "");
  assert.equal(green.style.display, "");
  assert.equal(big.style.display, "none");
  assert.equal(filter("gold"), 1);
  assert.equal(sectionById.second.hidden, true);
  assert.equal(filter("zzzz"), 0);
  assert.equal(sectionById.first.hidden, true);
  assert.equal(message.textContent, "No cracker matches that name.");
  assert.equal(filter(""), 3);
  assert.equal(sectionById.first.hidden, false);
  assert.equal(sectionById.second.hidden, false);
  assert.equal(big.style.display, "");
  assert.equal(message.textContent, "");
});
