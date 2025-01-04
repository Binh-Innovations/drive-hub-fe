import React from 'react';

interface TicketHistoryProps {
  id: string;
  date: string;
  from: string;
  to: string;
  price: number;
}

const TicketHistoryTable: React.FC<{ tickets: TicketHistoryProps[] }> = ({ tickets }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Mã vé</th>
          <th>Ngày mua</th>
          <th>Điểm đi</th>
          <th>Điểm đến</th>
          <th>Giá vé</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id}>
            <td>{ticket.id}</td>
            <td>{ticket.date}</td>
            <td>{ticket.from}</td>
            <td>{ticket.to}</td>
            <td>{ticket.price} VND</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketHistoryTable;
