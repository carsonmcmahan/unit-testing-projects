import type { AccountName, Transaction, TransactionType } from "../models/Transaction.model.js";

/*
    An Account should have the following properties:
    1. A name for the account
    2. A balance for storing money
    3. History to show transactions
    4. Should be able to deposit
    5. Should be able to withdraw
    6. Should be able to transfer between Accounts
*/
export class Account {
  protected _accountName: AccountName;

  protected _balance: number;
  protected _history: Array<Transaction> = [];

  constructor(name: AccountName, initialBalance: number = 0) {
    this._accountName = name;
    this._balance = initialBalance;

    if (initialBalance > 0) {
      this.pushItemToHistory("CREDIT", initialBalance);
    }
  }

  get balance(): number {
    return this._balance;
  }

  get history(): Array<Transaction> {
    return this._history;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw Error("Deposit amount must be greater than 0");

    this._balance += amount;
    this.pushItemToHistory("CREDIT", amount);
  }

  /**
   * Creates a `Transaction Object` and adds it to `_history`.
   * @param type Type of transaction
   * @param amount Amount added or removed from balance.
   */
  private pushItemToHistory(type: TransactionType, amount: number) {
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      account: this._accountName,
      type,
      amount,
    };

    this._history.push(transaction);
  }
}
