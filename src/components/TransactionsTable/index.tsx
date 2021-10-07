import { useEffect, useState } from 'react';
import { api } from '../../services/api';

import { Container } from './styles';

type TransactionProps = {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  date: Date;
};

export function TransactionsTable() {
  const [transactions, setTransaction] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api.get('transactions').then((response) => setTransaction(response.data));
  }, []);
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className="deposit">{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.date}</td>
              </tr>
            );
          })}

          <tr>
            <td>Aluguel</td>
            <td className="withdraw">- R$ 1.100</td>
            <td>Casa</td>
            <td>07/10/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
