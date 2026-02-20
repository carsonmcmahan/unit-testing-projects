export interface Transaction {
  id: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
}

export class BankManager {
  private _balance: number = 0;
  private _history: Array<Transaction> = [];

  get balance(): number {
    return this._balance;
  }

  get history(): Array<Transaction> {
    return this._history;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw Error("Deposit amount must be greater than 0");
    }

    this._balance += amount;
    this._history.push({
      id: crypto.randomUUID(),
      type: "CREDIT",
      amount,
    });
  }

  withdraw(amount: number): void {
    if (amount <= 0) throw Error("Withdraw amount must be greater than 0");
    if (amount > this.balance) throw Error("Insufficient funds, amount greater than balance");

    this._balance -= amount;
    this._history.push({
      id: crypto.randomUUID(),
      type: "DEBIT",
      amount,
    });
  }
}
