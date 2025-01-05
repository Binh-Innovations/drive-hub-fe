export const JWT_LOCAL_STORAGE_KEY = 'drive-hub-fe-jwt-token'


export const TRIP_ID = 'tripId'
export const LIST_HEADER_MENU = [
    {
        label: "Trips",
        url: "/trip",
    },
    {
        label: "Deals",
        url: "/deals",
    },
    {
        label: "Blog",
        url: "/blog",
    },
    {
        label: "Contact",
        url: "/contact",
    },
];

export const VEHICLE_TYPES = [
    {
        label: 'Ghế ngồi',
        value: '1'
    },
    {
        label: 'Giường nằm',
        value: '2'
    },
    {
        label: 'Ghế ngồi limousine',
        value: '3'
    },
    {
        label: 'Giường nằm limousine',
        value: '4'
    }
]

import {
    RocketOutlined,
    SafetyCertificateOutlined,
    CustomerServiceOutlined,
    DollarOutlined,
    ClockCircleOutlined,
    TeamOutlined
} from '@ant-design/icons';

export const HOME_FEATURES = [
    {
        id: 1,
        title: 'Đặt vé nhanh chóng',
        description: 'Chỉ với vài thao tác đơn giản, bạn có thể đặt vé xe một cách nhanh chóng và thuận tiện',
        icon: RocketOutlined,
        color: 'blue.500'
    },
    {
        id: 2,
        title: 'An toàn và đáng tin cậy',
        description: 'Chúng tôi đảm bảo mọi chuyến đi của bạn đều an toàn với đội ngũ tài xế chuyên nghiệp',
        icon: SafetyCertificateOutlined,
        color: 'green.500'
    },
    {
        id: 3,
        title: 'Hỗ trợ 24/7',
        description: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi',
        icon: CustomerServiceOutlined,
        color: 'purple.500'
    },
    {
        id: 4,
        title: 'Giá cả hợp lý',
        description: 'Cam kết mang đến cho bạn những mức giá tốt nhất cùng nhiều ưu đãi hấp dẫn',
        icon: DollarOutlined,
        color: 'yellow.500'
    },
    {
        id: 5,
        title: 'Lịch trình đa dạng',
        description: 'Nhiều lựa chọn về thời gian và tuyến đường để phù hợp với kế hoạch của bạn',
        icon: ClockCircleOutlined,
        color: 'red.500'
    },
    {
        id: 6,
        title: 'Dịch vụ chuyên nghiệp',
        description: 'Đội ngũ nhân viên được đào tạo chuyên nghiệp, tận tâm phục vụ hành khách',
        icon: TeamOutlined,
        color: 'teal.500'
    }
];