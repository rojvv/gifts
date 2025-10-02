export declare namespace Gift {
  /** A Telegram entity (user or channel) that owns the gift. */
  interface OwnerEntity {
    /** Owner type discriminator. */
    type: "entity";
    /** A URL to the photo of the entity. */
    photoUrl?: string;
    /** The name of the entity. */
    name: string;
  }

  /** A wallet that owns a gift. */
  interface OwnerWallet {
    /** Owner type discriminator. */
    type: "wallet";
    /** The address of the wallet. */
    address: string;
  }

  /** The owner of a gift. */
  type Owner = OwnerEntity | OwnerWallet;

  /** A gift model. */
  interface Model {
    /** The name of the model. */
    name: string;
    /** The rarity of the model out of 1,000. */
    rarity: number;
  }

  /** A gift backdrop. */
  interface Backdrop {
    /** The name of the backdrop. */
    name: string;
    /** The rarity of the backdrop out of 1,000. */
    rarity: number;
  }

  /** A gift symbol. */
  interface Symbol {
    /** The name of the symbol. */
    name: string;
    /** The rarity of the symbol out of 1,000. */
    rarity: number;
  }

  /** Information on a gift's availability. */
  interface Quantity {
    /** The number of issued units. */
    issued: number;
    /** The total supply. */
    total: number;
  }
}

/** Information on a gift fetched from Telegram's website. */
export interface Gift {
  /** The gift's name. */
  name: string;
  /** A URL to the gift's .tgs file. */
  tgsUrl: string;
  /** The gift's number. */
  number: number;
  /** The owner of the gift. */
  owner: Gift.Owner;
  /** The gift's model. */
  model: Gift.Model;
  /** The gift's backdrop. */
  backdrop: Gift.Backdrop;
  /** The gift's symbol. */
  symbol: Gift.Symbol;
  /** The gift's availability. */
  quantity: Gift.Quantity;
}
