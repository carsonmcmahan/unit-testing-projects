export type AccountName = "Checking" | "Savings";
export type TransactionType = "CREDIT" | "DEBIT" | "TRANSFER"; // credit for a deposit, debit for a withdraw, transfer for moving money to an account

export interface Transaction {
  id: string;
  account: AccountName;
  type: TransactionType;
  amount: number;
}
