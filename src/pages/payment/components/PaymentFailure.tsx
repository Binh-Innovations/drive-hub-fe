import { CloseCircleOutlined, HomeOutlined, RedoOutlined } from '@ant-design/icons';
import { Box, Button, Card, Stack, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';

interface PaymentFailureProps {
    error?: {
        message: string;
        code?: string;
    };
    onRetry?: () => void;
}

const PaymentFailure: React.FC<PaymentFailureProps> = ({ error, onRetry }) => {
    const navigate = useNavigate();
    const bgColor = useColorModeValue('white', 'gray.800');

    return (
        <Box maxW="container.md" mx="auto" py={10} px={4}>
            <Card bg={bgColor} p={6}>
                <VStack spacing={6}>
                    <Result
                        status="error"
                        title="Thanh toán thất bại!"
                        subTitle={error?.message || "Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại."}
                        icon={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
                    />

                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4} width="100%">
                        <Button
                            leftIcon={<HomeOutlined />}
                            colorScheme="gray"
                            size="lg"
                            width="full"
                            onClick={() => navigate('/')}
                        >
                            Về trang chủ
                        </Button>
                        <Button
                            leftIcon={<RedoOutlined />}
                            colorScheme="blue"
                            size="lg"
                            width="full"
                            onClick={onRetry}
                        >
                            Thử lại
                        </Button>
                    </Stack>

                    {error?.code && (
                        <Text color="gray.500" fontSize="sm">
                            Mã lỗi: {error.code}
                        </Text>
                    )}
                </VStack>
            </Card>
        </Box>
    );
};

export default PaymentFailure;