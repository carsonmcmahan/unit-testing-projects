export type AccountName = "Checking" | "Savings";
export type TransactionType = "CREDIT" | "DEBIT"; // credit for a deposit, debit for a withdraw

export interface Transaction {
  id: string;
  account: AccountName;
  type: TransactionType;
  amount: number;
}
