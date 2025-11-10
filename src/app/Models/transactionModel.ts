export interface TransactionModel {
  id: number;
  type: string;
  amount: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
