import { CheckCircleOutlined, HomeOutlined } from '@ant-design/icons';
import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Stack,
    Text,
    VStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';

interface PaymentSuccessProps {
    orderInfo?: {
        orderId: string;
        amount: number;
        paymentMethod: string;
        createdAt: string;
    };
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ orderInfo }) => {
    const navigate = useNavigate();
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Box maxW="container.md" mx="auto" py={10} px={4}>
            <Card
                bg={bgColor}
                borderColor={borderColor}
                borderWidth="1px"
                borderRadius="lg"
                p={6}
            >
                <VStack spacing={6} align="stretch">
                    {/* Phần header với icon thành công */}
                    <Result
                        status="success"
                        title="Thanh toán thành công!"
                        subTitle="Cảm ơn bạn đã đặt vé. Chúng tôi sẽ gửi thông tin chi tiết qua email của bạn."
                        icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                    />

                    {/* Thông tin đơn hàng */}
                    <Box
                        borderWidth="1px"
                        borderRadius="md"
                        p={4}
                        bg={useColorModeValue('gray.50', 'gray.700')}
                    >
                        <Stack spacing={4}>
                            <Heading size="md" mb={2}>
                                Chi tiết thanh toán
                            </Heading>

                            <Flex justify="space-between">
                                <Text color="gray.600">Mã đơn hàng:</Text>
                                <Text fontWeight="bold">{orderInfo?.orderId}</Text>
                            </Flex>

                            <Flex justify="space-between">
                                <Text color="gray.600">Số tiền:</Text>
                                <Text fontWeight="bold">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(orderInfo?.amount || 0)}
                                </Text>
                            </Flex>

                            <Flex justify="space-between">
                                <Text color="gray.600">Phương thức thanh toán:</Text>
                                <Text fontWeight="bold">{orderInfo?.paymentMethod}</Text>
                            </Flex>

                            <Flex justify="space-between">
                                <Text color="gray.600">Thời gian:</Text>
                                <Text fontWeight="bold">
                                    {orderInfo?.createdAt
                                        ? new Date(orderInfo.createdAt).toLocaleString('vi-VN')
                                        : '-'}
                                </Text>
                            </Flex>
                        </Stack>
                    </Box>

                    {/* Các nút điều hướng */}
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4} pt={4}>
                        <Button
                            leftIcon={<HomeOutlined />}
                            colorScheme="blue"
                            size="lg"
                            width="full"
                            onClick={() => navigate('/')}
                        >
                            Về trang chủ
                        </Button>
                        <Button
                            colorScheme="green"
                            size="lg"
                            width="full"
                            onClick={() => navigate('/tickets')}
                        >
                            Xem vé của tôi
                        </Button>
                    </Stack>

                    {/* Thông tin liên hệ */}
                    <Box textAlign="center" mt={4}>
                        <Text color="gray.500" fontSize="sm">
                            Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua
                        </Text>
                        <Text color="blue.500" fontSize="sm" fontWeight="bold">
                            admin@ducbinh203.info
                        </Text>
                    </Box>
                </VStack>
            </Card>
        </Box>
    );
};

export default PaymentSuccess;