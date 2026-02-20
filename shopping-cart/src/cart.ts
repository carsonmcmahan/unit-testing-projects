export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export class ShoppingCart {
  public items: CartItem[] = [];

  addItem(item: CartItem): void {
    if (item.price <= 0) throw Error("Item price must be greater than zero");
    if (item.quantity <= 0) throw Error("Item quantity must be greater than zero");

    const existingItem = this.items.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
      return;
    }

    this.items.push(item);
  }

  removeItem(id: number): void {
    const itemToRemove = this.items.find((i) => i.id === id);
    if (!itemToRemove) throw Error("Item must exist to be removed");

    const index = this.items.indexOf(itemToRemove);
    this.items.splice(index, 1);
  }

  getSubtotal(): number {
    let total = 0;

    this.items.forEach((item) => {
      const itemPrice = item.quantity * item.price;
      total += itemPrice;
    });

    // round to two decimal places
    return Math.round(total * 100) / 100;
  }
}
