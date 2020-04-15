import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balanceIncome = this.transactions.reduce(
      (accumulator, currentValue) => {
        if (currentValue.type === 'income') {
          return accumulator + currentValue.value;
        }
        return accumulator;
      },
      0,
    );
    const balanceOutcome = this.transactions.reduce(
      (accumulator, currentValue) => {
        if (currentValue.type === 'outcome') {
          return accumulator + currentValue.value;
        }
        return accumulator;
      },
      0,
    );
    const balance: Balance = {
      income: balanceIncome,
      outcome: balanceOutcome,
      total: balanceIncome - balanceOutcome,
    };
    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
