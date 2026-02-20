export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export class ShoppingCart {
  private _items: CartItem[] = [];
  private _discountPercentage: number | undefined;

  private discounts: Record<string, number> = {
    SAVE10: 10,
    SAVE15: 15,
    SAVE20: 20,
    SAVE30: 30,
  };

  get items(): CartItem[] {
    return this._items;
  }

  get discountPercentage(): number | undefined {
    return this._discountPercentage;
  }

  addItem(item: CartItem): void {
    if (item.price <= 0) throw Error("Item price must be greater than zero");
    if (item.quantity <= 0) throw Error("Item quantity must be greater than zero");

    const existingItem = this._items.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      return;
    }

    this._items.push(item);
  }

  removeItem(id: number): void {
    const itemToRemove = this._items.find((i) => i.id === id);
    if (!itemToRemove) throw Error("Item must exist to be removed");

    const index = this._items.indexOf(itemToRemove);
    this._items.splice(index, 1);
  }

  getSubtotal(): number {
    const total = this._items.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);

    return Math.round(total * 100) / 100;
  }

  applyPromoCode(code: string) {
    const discount = this.discounts[code];
    if (!discount) throw Error("Must use a valid discount code");

    this._discountPercentage = discount / 100;
  }

  getGrandTotal(): number {
    const subtotal = this.getSubtotal();

    if (this._discountPercentage === undefined) {
      return subtotal;
    }

    const cartPrice = subtotal - subtotal * this._discountPercentage;
    return Math.round(cartPrice * 100) / 100;
  }

  clearCart() {
    if (this._items.length === 0 && this._discountPercentage === undefined) {
      throw Error("Cart is already empty and no discount applied");
    }

    this._items = [];
    this._discountPercentage = undefined;
  }
}
