import { describe, it, expect, beforeEach } from "vitest";
import { Account } from "./Account.js";

describe(Account, () => {
  it("should init _balance to 0 if no initialBalance passed to Account", () => {
    const account = new Account("Checking");
    const balance = account.balance;

    expect(balance).toBe(0);
  });

  it("should init _balance to initialBalance if passed to Account", () => {
    const account = new Account("Checking", 25_000);
    const balance = account.balance;

    expect(balance).toBe(25_000);
  });

  it("should add a transaction to _history if initialBalance is passed", () => {
    const account = new Account("Checking", 25_000);
    const history = account.history;

    expect(history).toHaveLength(1);

    expect(history[0]?.type).toBe("CREDIT");
    expect(history[0]?.amount).toBe(25_000);
  });

  // foreach test we create an Account
  let savingsAccount: Account;
  beforeEach(() => {
    savingsAccount = new Account("Savings", 10_000);
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

      // length  of two because we pass an initialBalance to our constructor in beforeEach
      expect(history).toHaveLength(2);

      expect(history[1]?.type).toBe("CREDIT");
      expect(history[1]?.amount).toBe(1000);
    });
  });
});
