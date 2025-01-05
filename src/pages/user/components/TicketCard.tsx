import {
    Box,
    Card,
    VStack,
    HStack,
    Text,
    Badge,
    Button,
    Divider,
    Image,
    useColorModeValue,
} from '@chakra-ui/react';
import { Modal } from 'antd';
import { useState } from 'react';
import {
    ClockCircleOutlined,
    QrcodeOutlined,
    CarOutlined
} from '@ant-design/icons';
import { formatDateTime, formatPrice } from '@/utils';
import {Ticket} from "@/constants/types.ts";

interface TicketCardProps {
    ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
    const [showQR, setShowQR] = useState(false);
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { color: string; label: string }> = {
            active: { color: 'green', label: 'Đã đặt' },
            used: { color: 'blue', label: 'Đã hoàn thành' },
            canceled: { color: 'red', label: 'Đã hủy' }
        };

        const config = statusConfig[status] || { color: 'gray', label: status };
        return <Badge colorScheme={config.color}>{config.label}</Badge>;
    };

    console.log(ticket);
    return (
        <>
            <Card
                p={6}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
            >
                <VStack align="stretch" spacing={4}>
                    {/* Header */}
                    <HStack justify="space-between">
                        <VStack align="start" spacing={1}>
                            <Text fontSize="2xl" fontWeight="bold">
                                Mã đặt vé: {ticket.bookingCode}
                            </Text>
                            <Text color="gray.500">Ghế: {ticket.seatCode}</Text>
                        </VStack>
                        {getStatusBadge(ticket.status)}
                    </HStack>

                    <Divider />

                    {/* Trip Details */}
                    <VStack align="stretch" spacing={3}>
                        <HStack>
                            <ClockCircleOutlined />
                            <Text>Khởi hành: {formatDateTime(ticket.trip.departureTime)}</Text>
                        </HStack>
                        <HStack>
                            <ClockCircleOutlined />
                            <Text>Đến nơi: {formatDateTime(ticket.trip.arrivalTime)}</Text>
                        </HStack>

                        <HStack>
                            <CarOutlined />
                            <Text>Chuyến xe: {ticket.trip.route?.name}</Text>
                        </HStack>

                        <HStack>
                            <CarOutlined />
                            <Text>Biển số xe: {ticket.trip.vehicle?.licensePlate}</Text>
                        </HStack>

                        <HStack justify="space-between">
                            <Text fontWeight="bold">Giá vé:</Text>
                            <Text color="green.500" fontSize="lg" fontWeight="bold">
                                {formatPrice(ticket.trip.price)}
                            </Text>
                        </HStack>
                    </VStack>

                    <Divider />

                    {/* Footer */}
                    <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.500">
                            Đặt lúc: {formatDateTime(ticket.bookingTime)}
                        </Text>
                        <Button
                            leftIcon={<QrcodeOutlined />}
                            colorScheme="blue"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowQR(true)}
                        >
                            Xem QR
                        </Button>
                    </HStack>
                </VStack>
            </Card>

            {/* QR Modal */}
            <Modal
                title="Mã QR vé"
                open={showQR}
                onCancel={() => setShowQR(false)}
                footer={null}
                centered
            >
                <Box textAlign="center" p={4}>
                    <Image
                        src={ticket.qrCode}
                        alt="QR Code"
                        mx="auto"
                        maxW="200px"
                    />
                    <Text mt={4} fontSize="sm" color="gray.500">
                        Vui lòng xuất trình mã QR này khi lên xe
                    </Text>
                </Box>
            </Modal>
        </>
    );
};

export default TicketCard;