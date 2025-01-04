import React, { useState } from 'react';
import { Button, Card, Tooltip, Space, Badge, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Box, Text } from '@chakra-ui/react';
import { PrimaryButton } from '@/components';
import { useNavigate } from 'react-router-dom';

type Seat = {
  code: string;
  status: 'available' | 'booked' | 'active';
};

type LegendItem = {
  status: Seat['status'];
  label: string;
  color: string;
};

const SelectSeatPage: React.FC = () => {
  const navigate = useNavigate();
  const [seats, setSeats] = useState<Seat[]>([
    { code: 'A1', status: 'available' },
    { code: 'A2', status: 'available' },
    { code: 'A3', status: 'booked' },
    { code: 'A4', status: 'available' },
    { code: 'B1', status: 'available' },
    { code: 'B2', status: 'active' },
    { code: 'B3', status: 'available' },
    { code: 'B4', status: 'booked' },
    { code: 'C1', status: 'available' },
    { code: 'C2', status: 'available' },
    { code: 'C3', status: 'booked' },
    { code: 'C4', status: 'available' },
    { code: 'D1', status: 'available' },
    { code: 'D2', status: 'available' },
    { code: 'D3', status: 'available' },
    { code: 'D4', status: 'booked' },
  ]);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const legendItems: LegendItem[] = [
    { status: 'available', label: 'Ghế trống', color: '#ffffff' },
    { status: 'booked', label: 'Đã đặt', color: '#f5f5f5' },
    { status: 'active', label: 'Đang chọn', color: '#ff4d4f' },
  ];

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'available') {
      setSelectedSeats((prev) =>
        prev.includes(seat.code)
          ? prev.filter((code) => code !== seat.code)
          : [...prev, seat.code]
      );
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      navigate('/booking');
    } else {
      alert('Vui lòng chọn ít nhất một ghế');
    }
  };

  return (
    <Box maxW="1200px" mx="auto" mt="10" p="6">
      <Card 
        title={
          <Text fontSize="2xl" fontWeight="bold" color="gray.700">
            Chọn ghế
          </Text>
        }
        style={{ width: '100%', marginBottom: '20px' }}
        extra={
          <Space>
            {legendItems.map((item) => (
              <Badge
                key={item.status}
                color={item.color}
                text={item.label}
              />
            ))}
          </Space>
        }
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 0.5fr 1fr 1fr',
              gap: '15px',
              background: '#f0f2f5',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            {seats.map((seat, index) => (
              <React.Fragment key={seat.code}>
                {index % 4 === 2 && <div style={{ borderLeft: '2px dashed #d9d9d9' }}></div>}
                <Tooltip title={getSeatTooltip(seat)}>
                  <Button
                    type={selectedSeats.includes(seat.code) ? 'primary' : 'default'}
                    danger={seat.status === 'active'}
                    disabled={seat.status === 'booked'}
                    onClick={() => handleSeatClick(seat)}
                    icon={<UserOutlined />}
                    style={{
                      width: '70px',
                      height: '60px',
                      fontSize: '16px',
                      borderRadius: '8px',
                      ...getSeatStyle(seat),
                    }}
                  >
                    {seat.code}
                  </Button>
                </Tooltip>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div style={{ 
          marginTop: '20px',
          textAlign: 'center',
          padding: '15px',
          background: '#f0f2f5',
          borderRadius: '8px'
        }}>
          <strong>Ghế đã chọn: </strong> 
          {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn ghế'}
        </div>
      </Card>

      
    </Box>
  );
};

const getSeatTooltip = (seat: Seat): string => {
  switch (seat.status) {
    case 'available':
      return 'Ghế trống - Nhấn để chọn';
    case 'booked':
      return 'Ghế đã được đặt';
    case 'active':
      return 'Ghế đang được chọn';
    default:
      return '';
  }
};

const getSeatStyle = (seat: Seat) => {
  switch (seat.status) {
    case 'booked':
      return {
        backgroundColor: '#f5f5f5',
        cursor: 'not-allowed',
      };
    case 'active':
      return {
        backgroundColor: '#ff4d4f',
        color: '#fff',
      };
    default:
      return {};
  }
};

export default SelectSeatPage;
