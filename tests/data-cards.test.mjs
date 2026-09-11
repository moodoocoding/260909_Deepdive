import assert from "node:assert/strict";
import test from "node:test";
import { dataCards, dataTypes, getCardPageUrl, isLoopbackAddress, shuffleDataCards } from "../lib/data-cards.ts";

test("32 unique cards, eight of each type, with labels and explanations", () => {
  assert.equal(dataCards.length, 32);
  assert.equal(new Set(dataCards.map(card => card.id)).size, 32);
  for (const type of dataTypes) assert.equal(dataCards.filter(card => card.type === type.id).length, 8);
  for (const card of dataCards) assert.ok(card.label && card.emoji && card.explanation);
});

test("every shuffled deck contains each card once without modifying the source", () => {
  const original = dataCards.map(card => card.id);
  const orders = new Set();
  for (let i = 0; i < 100; i++) {
    const deck = shuffleDataCards().map(card => card.id);
    assert.deepEqual([...deck].sort(), [...original].sort());
    orders.add(deck.join(","));
  }
  assert.ok(orders.size > 1, "devices must not receive a fixed shared order");
  assert.deepEqual(dataCards.map(card => card.id), original);
});

test("reshuffling never immediately repeats the last card", () => {
  for (const card of dataCards) {
    const deck = shuffleDataCards(card.id, () => 0.999999);
    assert.notEqual(deck[0].id, card.id);
    assert.equal(new Set(deck.map(item => item.id)).size, 32);
  }
});

test("participation URLs preserve the origin and point to the phone route", () => {
  assert.equal(getCardPageUrl("https://school.example/anything?preview=1#top"), "https://school.example/data-cards");
  assert.equal(getCardPageUrl("http://192.168.0.20:5173/"), "http://192.168.0.20:5173/data-cards");
  assert.equal(getCardPageUrl("http://localhost:5173/"), "http://localhost:5173/data-cards");
  for (const invalid of ["", "school.example", "javascript:alert(1)", "file:///tmp/index.html", "https://name:password@example.com/"]) {
    assert.equal(getCardPageUrl(invalid), null);
  }
});

test("loopback URLs are recognized so unusable phone QR codes are not displayed", () => {
  for (const address of ["http://localhost:5173", "http://127.0.0.1:5173", "http://[::1]:5173", "http://0.0.0.0:5173", "http://test.localhost:5173"]) {
    assert.equal(isLoopbackAddress(address), true);
  }
  for (const address of ["https://school.example", "http://192.168.0.20:5173"]) assert.equal(isLoopbackAddress(address), false);
});
