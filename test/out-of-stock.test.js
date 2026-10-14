const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");

function controlFor(code) {
  const source = fs.readFileSync("script.js", "utf8");
  const functionSource = source.slice(source.indexOf("function makeControl"), source.indexOf("function changeQty"));
  const elements = [];
  const document = {
    createElement() {
      const element = {
        innerHTML: "",
        querySelector() { return { onclick: null }; }
      };
      elements.push(element);
      return element;
    }
  };
  const context = {
    document,
    cart: {},
    controls: {},
    OUT_OF_STOCK_CODES: new Set(["67A"]),
    changeQty() {}
  };
  vm.runInNewContext(`${functionSource}; makeControl(${JSON.stringify(code)})`, context);
  return elements[0].innerHTML;
}

test("discontinued items show an out-of-stock status instead of an add control", () => {
  assert.match(controlFor("67A"), /Out of stock/);
  assert.doesNotMatch(controlFor("67A"), /Add \+/);
});

test("available items keep their add control", () => {
  assert.match(controlFor("66"), /Add \+/);
});
