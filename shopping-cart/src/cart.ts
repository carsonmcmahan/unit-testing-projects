export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export class ShoppingCart {
  public items: CartItem[] = [];

  addItem(item: CartItem): void {
    this.items.push(item);
  }
}
