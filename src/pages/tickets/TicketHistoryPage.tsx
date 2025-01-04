import React from 'react';
import TicketHistoryTable from './components/TicketHistory';

const TicketHistoryPage: React.FC = () => {
  const ticketHistory = [
    { id: 'T001', date: '2024-12-01', from: 'Hà Nội', to: 'Hải Phòng', price: 150000 },
    { id: 'T002', date: '2024-12-05', from: 'Hà Nội', to: 'Đà Nẵng', price: 500000 },
  ];

  return (
    <div>
      <h1>Lịch Sử Mua Vé</h1>
      <TicketHistoryTable tickets={ticketHistory} />
    </div>
  );
};

export default TicketHistoryPage;
