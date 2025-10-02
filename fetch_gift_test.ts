import { assert } from "@std/assert/assert";
import { assertEquals } from "@std/assert/equals";
import { assertStringIncludes } from "@std/assert/string-includes";
import { assertGreater } from "@std/assert/greater";
import { assertLess } from "@std/assert/less";
import { fetchGift } from "./mod.ts";

Deno.test("fetchGift", async () => {
  const result = await fetchGift("plushpepe", 1);
  assertEquals(result.name, "Plush Pepe");
  assertStringIncludes(result.tgsUrl, "sticker.tgs");
  assertEquals(result.number, 1);
  assertEquals(result.model, { name: "Pumpkin", rarity: 30 });
  assertEquals(result.backdrop, { name: "Onyx Black", rarity: 20 });
  assertEquals(result.symbol, { name: "Illuminati", rarity: 5 });
  assert(result.owner.type === "entity");
  assert(typeof result.owner.photoUrl === "string");
  assertStringIncludes(result.owner.photoUrl, ".jpg");
  assertGreater(result.quantity.issued, 2000);
  assertGreater(result.quantity.total, 2000);
  assertLess(result.quantity.issued, 6000);
  assertLess(result.quantity.total, 6000);
});
