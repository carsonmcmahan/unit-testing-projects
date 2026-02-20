export interface Transaction {
  id: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
}

export class BankManager {
  private _balance: number = 0;
  private _history: Array<Transaction> = [];

  get balance() {
    return this._balance;
  }

  get history() {
    return this._history;
  }

  deposit(deposit: Transaction) {
    if (deposit.amount <= 0) {
      throw Error("Deposit amount must be greater than 0");
    }

    this._balance += deposit.amount;
    this._history.push(deposit);
  }
}
