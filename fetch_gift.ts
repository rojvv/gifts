import { DOMParser, type Element } from "@b-fuze/deno-dom";
import type { Gift } from "./gift.ts";

/**
 * Fetch information on a gift from Telegram's website.
 *
 * @param name The gift's name.
 * @param number The gift's number.
 */
export async function fetchGift(
  name: string,
  number: number,
  fetch: typeof globalThis.fetch = globalThis.fetch,
): Promise<Gift> {
  name = name.replaceAll(/\s/g, "").toLowerCase();
  const url = `https://t.me/nft/${name}-${number}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Got a non-2XX response");
  }
  const document = new DOMParser().parseFromString(
    await response.text(),
    "text/html",
  );
  const tgme_page_gift = document.querySelector(".tgme_page_gift");
  if (!tgme_page_gift) {
    fail();
  }
  name = tgme_page_gift.querySelector(".tgme_gift_preview > svg text")
    ?.textContent ?? "";
  if (!name) {
    fail();
  }

  const table = tgme_page_gift.querySelector(".tgme_gift_table");
  const ths = Array.from(table?.querySelectorAll("th") ?? []);

  const tgsUrl = tgme_page_gift.querySelector(
    'source[type="application/x-tgsticker"]',
  )?.getAttribute("srcset");

  if (!tgsUrl) {
    fail();
  }

  let model: Gift.Model;
  {
    const th = ths.find((v) => v.textContent == "Model");
    const td = th?.nextElementSibling;
    const rarity = parseRarity(td);
    const name = td?.textContent?.trim();
    if (typeof name !== "string") {
      fail();
    }
    model = { name, rarity };
  }

  let symbol: Gift.Symbol;
  {
    const th = ths.find((v) => v.textContent == "Symbol");
    const td = th?.nextElementSibling;
    const rarity = parseRarity(td);
    const name = td?.textContent?.trim();
    if (typeof name !== "string") {
      fail();
    }
    symbol = { name, rarity };
  }

  let backdrop: Gift.Backdrop;
  {
    const th = ths.find((v) => v.textContent == "Backdrop");
    const td = th?.nextElementSibling;
    const rarity = parseRarity(td);
    const name = td?.textContent?.trim();
    if (typeof name !== "string") {
      fail();
    }
    backdrop = { name, rarity };
  }

  let owner: Gift.Owner;
  {
    const th = ths.find((v) => v.textContent == "Owner");
    const td = th?.nextElementSibling;
    const address = td?.querySelector(".tgme_gift_owner_address")?.textContent;
    if (address) {
      owner = { type: "wallet", address };
    } else {
      const name = td?.textContent?.trim() ?? "";
      const photoUrl = td?.querySelector("img")?.getAttribute("src") ||
        undefined;
      owner = { type: "entity", photoUrl, name };
    }
  }

  let quantity: Gift.Quantity;
  {
    const th = ths.find((v) => v.textContent == "Quantity");
    const td = th?.nextElementSibling;
    const parts = (td?.textContent ?? "").replace(" issued", "").trim().split(
      "/",
    );
    if (parts.length !== 2) {
      fail();
    }
    const [issued, total] = [
      Number(parts[0].replaceAll(/\s/g, "")),
      Number(parts[1].replaceAll(/\s/g, "")),
    ];
    if (isNaN(issued) || isNaN(total) || issued < 1 || total < 1) {
      fail();
    }
    quantity = { issued, total };
  }

  const gift: Gift = {
    name,
    tgsUrl,
    number,
    model,
    backdrop,
    symbol,
    owner,
    quantity,
  };
  return gift;
}
function fail(): never {
  throw new Error("Failed to fetch gift");
}
function parseRarity(td: Element | null | undefined) {
  const mark = td?.querySelector("mark");
  const rarity = (Number(mark?.textContent?.replace("%", "").trim()) || 0) * 10;
  mark?.remove();
  return rarity;
}
