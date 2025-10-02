# @roj/gifts

Fetch information on Telegram gifts from the website.

## Installation

### Deno

```shell
deno add jsr:@roj/gifts
```

### pnpm

```shell
pnpm add jsr:@roj/gifts
```

### Yarn

```shell
yarn add jsr:@roj/gifts
```

### npm

```shell
npx jsr i @roj/gifts
```

### Bun

```shell
bunx jsr add @roj/gifts
```

## Usage

```ts
import { fetchGift } from "@roj/gifts";

const gift = await fetchGift("plushpepe", 1);
console.debug(gift);
```

## API Reference

The API reference is available [here](https://jsr.io/@roj/gifts/doc).

## License

This project is made available under the [MIT License](./LICENSE).
