import { describe, it, expect, beforeEach } from "vitest";
import { ShoppingCart } from "./cart.js";

describe("ShoppingCart", () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  /* BEGIN ADD ITEM TESTS */
  it("should start with an empty cart", () => {
    expect(cart.items).toEqual([]);
  });

  it("should not add an item that has a price of 0 or negative", () => {
    // adding an item with a price of 0
    expect(() => {
      cart.addItem({ id: 1, name: "Apple", price: 0, quantity: 2 });
    }).toThrowError("Item price must be greater than zero");

    // adding an item with a price that is negative
    expect(() => {
      cart.addItem({ id: 2, name: "Orange", price: -9, quantity: 1 });
    }).toThrowError("Item price must be greater than zero");
  });

  it("should not add an item that has a quantity of 0 or negative", () => {
    // adding an item with a quantity of 0
    expect(() => {
      cart.addItem({ id: 1, name: "Apple", price: 0.68, quantity: 0 });
    }).toThrowError("Item quantity must be greater than zero");

    // adding an item with a quantity that is negative
    expect(() => {
      cart.addItem({ id: 2, name: "Orange", price: 0.8, quantity: -10 });
    }).toThrowError("Item quantity must be greater than zero");
  });

  it("should add an item to the cart", () => {
    cart.addItem({ id: 1, name: "Apple", price: 0.68, quantity: 2 });

    expect(cart.items.length).toBe(1);
    expect(cart.items[0]?.name).toBe("Apple");
  });

  it("should update an items quantity if it exists", () => {
    cart.addItem({ id: 2, name: "Orange", price: 0.8, quantity: 1 });
    cart.addItem({ id: 2, name: "Orange", price: 0.8, quantity: 1 });

    expect(cart.items.length).toBe(1);
    expect(cart.items[0]?.quantity).toBe(2);
  });
  /* END ADD ITEM TESTS */

  /* BEGIN REMOVE ITEM TESTS */
  it("should remove an item completely form the cart", () => {
    cart.addItem({ id: 1, name: "Apple", price: 0.68, quantity: 1 });
    cart.addItem({ id: 2, name: "Orange", price: 0.8, quantity: 3 });
    cart.addItem({ id: 3, name: "Bread", price: 2.5, quantity: 1 });
    cart.addItem({ id: 4, name: "Beans", price: 0.99, quantity: 2 });

    cart.removeItem(2);
    expect(cart.items.length).toBe(3);
    expect(cart.items[1]?.id).toBe(3);
  });

  it("should exit removeItem function if item does not exist", () => {
    cart.addItem({ id: 1, name: "Apple", price: 0.68, quantity: 1 });
    cart.addItem({ id: 2, name: "Orange", price: 0.8, quantity: 3 });
    cart.addItem({ id: 3, name: "Bread", price: 2.5, quantity: 1 });
    cart.addItem({ id: 4, name: "Beans", price: 0.99, quantity: 2 });

    expect(() => {
      cart.removeItem(5);
    }).toThrowError("Item must exist to be removed");
  });
  /* END REMOVE ITEM TESTS */

  /* BEGIN GET SUBTOTAL TESTS */
  it("should return the total price of all items before a discount", () => {
    cart.addItem({ id: 1, name: "Apple", price: 0.68, quantity: 1 });
    cart.addItem({ id: 2, name: "Orange", price: 0.8, quantity: 3 });

    const actual = cart.getSubtotal();
    expect(actual).toBe(3.08);
  });
  /* END GET SUBTOTAL TESTS */
});
