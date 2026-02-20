import { describe, it, expect, beforeEach } from "vitest";
import { BankManager, type Transaction } from "./bank.js";

describe(BankManager, () => {
  let bankManager: BankManager;

  beforeEach(() => {
    bankManager = new BankManager();
  });

  it("should be init with a balance of 0", () => {
    const actual = bankManager.balance;
    expect(actual).toBe(0);
  });

  it("should be init with transactions being empty", () => {
    const actual = bankManager.history;
    expect(actual).toEqual([]);
  });

  describe("deposit()", () => {
    it("throw an error if amount is 0", () => {
      const given = 0;

      expect(() => {
        bankManager.deposit(given);
      }).toThrowError("Deposit amount must be greater than 0");
    });

    it("throw an error if amount is less than 0", () => {
      const given = -1000;

      expect(() => {
        bankManager.deposit(given);
      }).toThrowError("Deposit amount must be greater than 0");
    });

    it("should add amount to _balance", () => {
      const given = 200;

      bankManager.deposit(given);
      const balance = bankManager.balance;
      expect(balance).toBe(200);
    });

    it("should add the deposit to _history", () => {
      const given = 200;

      bankManager.deposit(given);
      const history = bankManager.history;
      expect(history).toHaveLength(1);
    });
  });

  describe("withdraw()", () => {
    it("throw an error if amount is 0", () => {
      const given = 0;

      expect(() => {
        bankManager.withdraw(given);
      }).toThrowError("Withdraw amount must be greater than 0");
    });

    it("throw an error if amount is less than 0", () => {
      const given = -1000;

      expect(() => {
        bankManager.withdraw(given);
      }).toThrowError("Withdraw amount must be greater than 0");
    });

    it("should throw insufficient funds if amount is greater than current balance", () => {
      const given = 1000;
      expect(() => {
        bankManager.withdraw(given);
      }).toThrowError("Insufficient funds, amount greater than balance");
    });

    it("should withdraw the amount from _balance and push the transaction to _history", () => {
      bankManager.deposit(50_000);

      const given = 3000;
      bankManager.withdraw(given);

      const balance = bankManager.balance;
      const history = bankManager.history;

      expect(balance).toBe(47_000);

      expect(history).toHaveLength(2);
      expect(history[1]?.type).toBe("DEBIT");
      expect(history[1]?.amount).toBe(3000);
    });
  });

  describe("getHistory()", () => {
    it("should return a complete array of transactions", () => {
      bankManager.deposit(50_000); // 0
      bankManager.withdraw(10_000); // 1
      bankManager.deposit(5_000); // 2
      bankManager.withdraw(25_000); // 3

      const history = bankManager.history;

      expect(history).toHaveLength(4);

      expect(history[0]?.type).toBe("CREDIT");
      expect(history[2]?.type).toBe("CREDIT");

      expect(history[1]?.type).toBe("DEBIT");
      expect(history[3]?.type).toBe("DEBIT");

      expect(history[3]?.amount).toBe(25_000);
    });
  });
});
