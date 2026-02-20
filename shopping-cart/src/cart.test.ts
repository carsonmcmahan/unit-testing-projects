import { describe, it, expect, beforeEach } from "vitest";
import { ShoppingCart } from "./cart.js";

describe("ShoppingCart", () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  it("should start with an empty cart", () => {
    expect(cart.items).toEqual([]);
  });

  it("should add an item to the cart", () => {
    cart.addItem({ id: 1, name: "Apple", price: 0.68, quantity: 2 });

    expect(cart.items.length).toBe(1);
    expect(cart.items[0]?.name).toBe("Apple");
  });
});
