import React from 'react';
import TicketDetail from './components/TicketDetail';

const TicketDetailPage: React.FC = () => {
  const sampleTicket = {
    id: 'T001',
    customerName: 'Nguyen Van A',
    from: 'Hà Nội',
    to: 'Hải Phòng',
    departureTime: '2024-12-30 15:30',
    seatNumber: 'A12',
    price: 150000,
  };

  return (
    <div>
      
      <TicketDetail ticket={sampleTicket} />
    </div>
  );
};

export default TicketDetailPage;
