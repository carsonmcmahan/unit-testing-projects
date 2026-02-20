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
      const given: Transaction = {
        id: Date.now().toString(),
        type: "CREDIT",
        amount: 0,
      };

      expect(() => {
        bankManager.deposit(given);
      }).toThrowError("Deposit amount must be greater than 0");
    });

    it("throw an error if amount is less than 0", () => {
      const given: Transaction = {
        id: Date.now().toString(),
        type: "CREDIT",
        amount: -1000,
      };

      expect(() => {
        bankManager.deposit(given);
      }).toThrowError("Deposit amount must be greater than 0");
    });

    it("should add amount to _balance", () => {
      const given: Transaction = {
        id: Date.now().toString(),
        type: "CREDIT",
        amount: 200,
      };

      bankManager.deposit(given);
      const balance = bankManager.balance;
      expect(balance).toBe(100);
    });

    it("should add the deposit to _history", () => {
      const given: Transaction = {
        id: Date.now().toString(),
        type: "CREDIT",
        amount: 200,
      };

      bankManager.deposit(given);
      const history = bankManager.history;
      expect(history).toHaveLength(1);
    });
  });
});
