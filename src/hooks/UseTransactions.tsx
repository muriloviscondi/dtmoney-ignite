import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

type TransactionProps = {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
};

// type TransactionInput = {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// };

// type TransactionInput = Omit<
//   TransactionProps,
//   'title' | 'amount' | 'type' | 'category'
//>;

type TransactionInput = Omit<TransactionProps, 'id' | 'createdAt'>;

type TransactionCreate = {
  transaction: TransactionProps;
};

type TransactionsProviderProps = {
  children: ReactNode;
};

type TransactionsContextData = {
  transactions: TransactionProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
};

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransaction] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api
      .get('transactions')
      .then((response) => setTransaction(response.data['transactions']));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = (
      await api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date(),
      })
    ).data as unknown as TransactionCreate;

    const transaction = response.transaction;

    setTransaction([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(TransactionsContext);

  return context;
}
