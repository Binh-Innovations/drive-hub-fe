import axiosClient from "@/apis/config/axiosClient.ts";

const paymentService = {
    verifyPayment: async (params = {}): Promise<any> => {
        return await axiosClient.get('/payment/vnpay-return', { params });
    }
}

export default paymentService