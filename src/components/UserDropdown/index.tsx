import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { Flex } from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
import {FaTicketAlt} from "react-icons/fa";

interface UserDropdownProps {
    userInfo: {
        email: string;
        avatar?: string;
        username?: string;
    };
    onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ userInfo, onLogout }) => {
    const navigate = useNavigate();
    const menuItems: MenuProps['items'] = [
        {
            key: 'userInfo',
            label: (
                <div style={{ padding: '8px 0' }}>
                    <div style={{ fontWeight: 'bold' }}>{userInfo.username}</div>
                    <div style={{ color: '#666' }}>{userInfo.email}</div>
                </div>
            ),
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'profile',
            label: 'Thông tin cá nhân',
            icon: <UserOutlined />,
        },
        {
            key: 'my-tickets',
            label: 'Vé của tôi',
            icon: <FaTicketAlt />,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            danger: true,
        },
    ];

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'logout') {
            onLogout();
        }
        // Xử lý các menu item khác
        if (e.key === 'profile') {
            navigate('/profile');
        }
        if (e.key === 'my-tickets') {
            navigate('/my-ticket');
        }
    };

    return (
        <Dropdown
            menu={{
                items: menuItems,
                onClick: handleMenuClick,
            }}
            trigger={['click', 'hover']}
            placement="bottomRight"
        >
            <Flex
                alignItems="center"
                gap={2}
                style={{ cursor: 'pointer' }}
                className="hover-effect"
            >
                <Avatar
                    size="default"
                    src={userInfo.avatar}
                    icon={!userInfo.avatar && <UserOutlined />}
                />
                <span style={{ fontSize: '14px' }}>{userInfo?.email}</span>
            </Flex>
        </Dropdown>
    );
};

export default UserDropdown;