import { describe, it, expect, beforeEach } from "vitest";
import { ShoppingCart } from "./cart.js";

describe("ShoppingCart", () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  describe("addItem()", () => {
    it("should start with an empty cart", () => {
      expect(cart.items).toEqual([]);
    });

    it("should not add an item that has a price of 0 or negative", () => {
      expect(() => {
        cart.addItem({ id: 1, name: "Apple", price: 0, quantity: 2 });
      }).toThrowError("Item price must be greater than zero");

      expect(() => {
        cart.addItem({ id: 2, name: "Orange", price: -9, quantity: 1 });
      }).toThrowError("Item price must be greater than zero");
    });

    it("should not add an item that has a quantity of 0 or negative", () => {
      expect(() => {
        cart.addItem({ id: 1, name: "Apple", price: 0.68, quantity: 0 });
      }).toThrowError("Item quantity must be greater than zero");

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
      cart.addItem({ id: 2, name: "Orange", price: 0.8, quantity: 2 });
      cart.addItem({ id: 2, name: "Orange", price: 0.8, quantity: 3 });

      expect(cart.items.length).toBe(1);
      expect(cart.items[0]?.quantity).toBe(5);
    });
  });

  describe("removeItem()", () => {
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

      expect(() => {
        cart.removeItem(5);
      }).toThrowError("Item must exist to be removed");
    });
  });

  describe("getSubtotal()", () => {
    it("should return the total price of all items before a discount", () => {
      cart.addItem({ id: 1, name: "Apple", price: 0.68, quantity: 1 });
      cart.addItem({ id: 2, name: "Orange", price: 0.8, quantity: 3 });
      cart.addItem({ id: 3, name: "Grapes", price: 1.5, quantity: 5 });

      const actual = cart.getSubtotal();
      expect(actual).toBe(10.58);
    });
  });

  describe("applyPromoCode()", () => {
    it("should not apply discount is code does not exist", () => {
      const given = "SAVE50";

      expect(() => {
        cart.applyPromoCode(given);
      }).toThrowError("Must use a valid discount code");
    });

    it("should take a discount code and store the percentage in a variable", () => {
      const given = "SAVE30";
      cart.applyPromoCode(given);

      expect(cart.discountPercentage).toBe(0.3);
    });
  });

  describe("getGrandTotal()", () => {
    it("should return the subtotal if there is no discount", () => {
      cart.addItem({ id: 1, name: "Apple", price: 0.68, quantity: 1 });
      cart.addItem({ id: 2, name: "Orange", price: 0.8, quantity: 3 });
      cart.addItem({ id: 3, name: "Grapes", price: 1.5, quantity: 5 });

      const actual = cart.getGrandTotal();
      expect(actual).toBe(10.58);
    });

    it("should return the subtotal minus the active discount percentage", () => {
      cart.addItem({ id: 1, name: "Apple", price: 0.68, quantity: 1 });
      cart.addItem({ id: 2, name: "Orange", price: 0.8, quantity: 3 });
      cart.addItem({ id: 3, name: "Grapes", price: 1.5, quantity: 5 });

      const promoCode = "SAVE30";
      cart.applyPromoCode(promoCode);

      const actual = cart.getGrandTotal();
      expect(actual).toBe(7.41);
    });
  });

  describe("clearCart()", () => {
    it("should throw error if cart is already empty and no active discount", () => {
      expect(() => {
        cart.clearCart();
      }).toThrowError("Cart is already empty and no discount applied");
    });

    it("should clear cart array and remove active discount", () => {
      cart.addItem({ id: 1, name: "Apple", price: 0.68, quantity: 1 });
      cart.applyPromoCode("SAVE10");

      cart.clearCart();

      expect(cart.items).toEqual([]);
      expect(cart.discountPercentage).toEqual(undefined);
    });
  });
});
