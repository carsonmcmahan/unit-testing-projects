import { describe, it, expect, beforeEach } from "vitest";
import { Account } from "./Account.js";

describe(Account, () => {
  it("should init _balance to 0 if no initialBalance passed to Account", () => {
    const account = new Account();
    account.accountName = "Checking";
    const balance = account.balance;

    expect(balance).toBe(0);
  });

  // foreach test we create an Account
  let savingsAccount: Account;
  beforeEach(() => {
    savingsAccount = new Account();
    savingsAccount.accountName = "Savings";
    savingsAccount.deposit(10_000);
  });

  describe("deposit()", () => {
    it("throw an error if amount is 0", () => {
      const given = 0;

      expect(() => {
        savingsAccount.deposit(given);
      }).toThrowError("Deposit amount must be greater than 0");
    });

    it("throw an error if amount is less than 0", () => {
      const given = -5000;

      expect(() => {
        savingsAccount.deposit(given);
      }).toThrowError("Deposit amount must be greater than 0");
    });

    it("should add an amount to _balance", () => {
      const given = 1000;

      savingsAccount.deposit(given);
      const balance = savingsAccount.balance;
      expect(balance).toBe(11_000);
    });

    it("should add the deposit to _history", () => {
      const given = 1000;

      savingsAccount.deposit(given);
      const history = savingsAccount.history;

      // length  of two because we pass deposit in our beforeEach
      expect(history).toHaveLength(2);

      expect(history[1]?.type).toBe("CREDIT");
      expect(history[1]?.amount).toBe(1000);
    });
  });

  describe("withdraw()", () => {
    it("throw error if amount is 0", () => {
      const given = 0;

      expect(() => {
        savingsAccount.withdraw(given);
      }).toThrowError("Withdraw amount must be grater than 0");
    });

    it("throw error if amount is negative", () => {
      const given = -100;

      expect(() => {
        savingsAccount.withdraw(given);
      }).toThrowError("Withdraw amount must be grater than 0");
    });

    it("throw error if amount is greater than _balance", () => {
      const given = 11_000;

      expect(() => {
        savingsAccount.withdraw(given);
      }).toThrow("Amount must not be greater than balance");
    });

    it("should subtract amount from _balance", () => {
      const given = 1000;
      savingsAccount.withdraw(given);

      const actual = savingsAccount.balance;
      expect(actual).toBe(9000);
    });

    it("should add transaction to history", () => {
      const given = 1000;
      savingsAccount.withdraw(given);

      const history = savingsAccount.history;
      expect(history).toHaveLength(2);
      expect(history[1]?.amount).toBe(1000);
    });
  });

  let checkingAccount: Account;
  beforeEach(() => {
    checkingAccount = new Account();
    checkingAccount.accountName = "Checking";
    checkingAccount.deposit(10_000);
  });

  describe("transfer()", () => {
    it("throw error if amount is 0", () => {
      expect(() => {
        checkingAccount.transfer(savingsAccount, 0);
      }).toThrowError("Transfer amount must be greater than 0");
    });

    it("throw error if amount is negative", () => {
      expect(() => {
        checkingAccount.transfer(savingsAccount, -1000);
      }).toThrowError("Transfer amount must be greater than 0");
    });

    it("throw error if amount is greater than _balance", () => {
      expect(() => {
        checkingAccount.transfer(savingsAccount, 11_000);
      }).toThrowError("Amount must not be greater than balance");
    });

    it("should withdraw from account and add a TRANSFER transaction to _history", () => {
      const amount = 1000;
      checkingAccount.transfer(savingsAccount, amount);

      const balance = checkingAccount.balance;
      const history = checkingAccount.history;

      expect(balance).toBe(9000);

      expect(history).toHaveLength(3);
      expect(history[1]?.type).toBe("DEBIT");
      expect(history[2]?.type).toBe("TRANSFER");
    });

    it("should deposit to transfer account", () => {
      const amount = 1000;
      checkingAccount.transfer(savingsAccount, amount);

      const savingsBalance = savingsAccount.balance;
      const savingsHistory = savingsAccount.history;

      expect(savingsBalance).toBe(11_000);

      expect(savingsHistory).toHaveLength(2);
      expect(savingsHistory[1]?.type).toBe("CREDIT");
    });
  });
});
