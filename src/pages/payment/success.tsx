import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Spinner, Center } from '@chakra-ui/react';
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";
import paymentService from "@/apis/service/payment";

interface PaymentError {
    message: string;
    code?: string;
}

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [orderInfo, setOrderInfo] = useState<any>(null);
    const [error, setError] = useState<PaymentError | null>(null);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            setLoading(true);
            const vnp_TxnRef = searchParams.get('vnp_TxnRef');
            const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');

            // Kiểm tra response code từ VNPay
            if (vnp_ResponseCode !== '00') {
                throw new Error('Thanh toán không thành công');
            }

            const request: any = {};
            for(const key of searchParams.keys()) {
                request[key] = searchParams.get(key);
            }

            const response = await paymentService.verifyPayment(request);

            if (!response) {
                throw new Error('Không thể xác thực thanh toán');
            }

            setOrderInfo({
                orderId: vnp_TxnRef,
                amount: response?.amount ?? 0,
                paymentMethod: 'VNPay',
                createdAt: new Date().toISOString(),
            });
            setError(null);
        } catch (error: any) {
            console.error('Payment verification failed:', error);
            setError({
                message: error.message || 'Đã có lỗi xảy ra trong quá trình thanh toán',
                code: searchParams.get('vnp_ResponseCode') || undefined
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [searchParams]);

    const handleRetry = () => {
        navigate('/trip');
    };

    if (loading) {
        return (
            <Center h="100vh">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Center>
        );
    }

    // Nếu có lỗi, hiển thị component thất bại
    if (error) {
        return <PaymentFailure error={error} onRetry={handleRetry} />;
    }

    // Nếu không có lỗi, hiển thị component thành công
    return <PaymentSuccess orderInfo={orderInfo} />;
};

export default PaymentSuccessPage;