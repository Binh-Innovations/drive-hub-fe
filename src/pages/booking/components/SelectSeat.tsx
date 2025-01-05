import {UserOutlined} from '@ant-design/icons';
import {Box, Text} from '@chakra-ui/react';
import {Badge, Button, Card, Space, Tooltip} from 'antd';
import {IGetAllTicketAvailable} from '@/apis/service/type.response';

type Seat = {
    code: string;
    status: 'available' | 'booked' | 'active';
    rowLabel: string;
    columnLabel: string;
};

type LegendItem = {
    status: Seat['status'];
    label: string;
    color: string;
};


const getSeatTooltip = (seat: Seat): string => {
    switch (seat.status) {
        case 'available':
            return 'Ghế trống - Nhấn để chọn';
        case 'active':
            return 'Ghế đã được đặt';
        case 'booked':
            return 'Ghế đang được chọn';
        default:
            return '';
    }
};

const getSeatStyle = (seat: Seat) => {
    switch (seat.status) {
        case 'booked':
            return {
                backgroundColor: '#ccc',
                cursor: 'not-allowed',
            };
        case 'active':
            return {
                backgroundColor: '#ff4d4f',
                color: '#fff',
            };
        case 'available':
            return {}
        default:
            return {};
    }
};

const SelectSeatPage: React.FC<{
    listSeats: IGetAllTicketAvailable[],
    row: number,
    column: number,
    selectedSeats: string[],
    setSelectedSeats: (seats: any) => void,
}> = (
    {
        listSeats,
        row,
        column,
        selectedSeats,
        setSelectedSeats,
    }) => {
    const seats: Seat[] = listSeats.map((item: IGetAllTicketAvailable) => ({
        code: item.seat.seatCode,
        status: item.status as Seat['status'],
        rowLabel: item.seat.rowLabel,
        columnLabel: item.seat.columnLabel,
    }));

    const legendItems: LegendItem[] = [
        {status: 'available', label: 'Ghế trống', color: '#ffffff'},
        {status: 'active', label: 'Đã đặt', color: '#ccc'},
        {status: 'booked', label: 'Đang chọn', color: '#ff4d4f'},
    ];

    const createSeatGrid = () => {
        const grid: (Seat | null)[][] = [];

        for (let i = 1; i <= row; i++) {
            const rowSeats: (Seat | null)[] = [];
            for (let j = 0; j < column; j++) {
                rowSeats.push(null);
            }
            grid.push(rowSeats);
        }

        seats.forEach(seat => {
            const rowIndex = parseInt(seat.rowLabel) - 1;
            const colIndex = seat.columnLabel.charCodeAt(0) - 'A'.charCodeAt(0);
            if (rowIndex >= 0 && rowIndex < row && colIndex >= 0 && colIndex < column) {
                grid[rowIndex][colIndex] = seat;
            }
        });

        return grid;
    };

    const handleSeatClick = (seat: Seat) => {
        if (seat.status === 'available') {
            setSelectedSeats((prev: string[]) =>
                prev.includes(seat.code)
                    ? prev.filter((code: string) => code !== seat.code)
                    : [...prev, seat.code]
            );
        }
    };

    const seatGrid = createSeatGrid();

    return (

        <Box maxW="1200px" mx="auto" mt="10" p="6">
            <Card
                title={
                    <Text fontSize="2xl" fontWeight="bold" color="gray.700">
                        Chọn ghế
                    </Text>
                }
                style={{width: '100%', marginBottom: '20px'}}
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
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            background: '#f0f2f5',
                            padding: '20px',
                            borderRadius: '8px',
                        }}
                    >
                        {seatGrid.map((rowSeats, rowIndex) => (
                            <div
                                key={rowIndex}
                                style={{
                                    display: 'flex',
                                    gap: '15px',
                                    justifyContent: 'center'
                                }}
                            >
                                {rowSeats.map((seat, colIndex) => (
                                    seat ? (
                                        <Tooltip key={`${rowIndex}-${colIndex}`} title={getSeatTooltip(seat)}>
                                            <Button
                                                type={selectedSeats.includes(seat.code) ? 'primary' : 'default'}
                                                danger={seat.status === 'active'}
                                                disabled={seat.status === 'booked'}
                                                onClick={() => handleSeatClick(seat)}
                                                icon={<UserOutlined/>}
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
                                    ) : (
                                        <div
                                            key={`${rowIndex}-${colIndex}`}
                                            style={{width: '70px', height: '60px'}}
                                        />
                                    )
                                ))}
                            </div>
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

export default SelectSeatPage;
