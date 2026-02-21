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
  private _accountName: AccountName | undefined;

  private _balance: number = 0;
  private _history: Array<Transaction> = [];

  set accountName(name: AccountName) {
    this._accountName = name;
  }

  get balance(): number {
    return this._balance;
  }

  get history(): Array<Transaction> {
    return this._history;
  }

  /**
   * Adds amount to `_balance`.
   * @param amount Amount of money to deposit.
   */
  deposit(amount: number): void {
    if (amount <= 0) throw Error("Deposit amount must be greater than 0");

    this._balance += amount;
    this.pushItemToHistory("CREDIT", amount);
  }

  /**
   * Subtracts amount from `_balance`.
   * @param amount Amount of money to withdraw.
   */
  withdraw(amount: number): void {
    if (amount <= 0) throw Error("Withdraw amount must be grater than 0");
    if (amount > this._balance) throw Error("Amount must not be greater than balance");

    this._balance -= amount;
    this.pushItemToHistory("DEBIT", amount);
  }

  /**
   * Transfer money from one account to another
   * @param transferToAccount
   * @param amount
   */
  transfer(transferToAccount: Account, amount: number): void {
    if (amount <= 0) throw Error("Transfer amount must be greater than 0");
    if (amount > this._balance) throw Error("Amount must not be greater than balance");

    this.withdraw(amount);
    this.pushItemToHistory("TRANSFER", amount);

    transferToAccount.deposit(amount);
  }

  /**
   * Creates a `Transaction Object` and adds it to `_history`.
   * @param type Type of transaction
   * @param amount Amount added or removed from balance.
   */
  private pushItemToHistory(type: TransactionType, amount: number) {
    if (!this._accountName) {
      throw Error("Account name must be defined to add transactions");
    }

    let transaction: Transaction = {
      id: crypto.randomUUID(),
      account: this._accountName,
      type,
      amount,
    };

    this._history.push(transaction);
  }
}
