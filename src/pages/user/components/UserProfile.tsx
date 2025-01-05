import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useToast
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {UserInfo} from "@/hooks/useUserInfo.ts";

interface UserProfileProps {
    userInfo: UserInfo | null;
    onUpdateInfo: (data: Partial<UserInfo>) => Promise<void>;
    onChangePassword: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => Promise<void>;
}

const UserProfile: React.FC<UserProfileProps> = ({ userInfo, onUpdateInfo, onChangePassword }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userInfo?.name || '',
        phone: userInfo?.phone || '',
        address: userInfo?.address || ''
    });

    const {
        isOpen: isChangePasswordOpen,
        onOpen: onChangePasswordOpen,
        onClose: onChangePasswordClose
    } = useDisclosure();

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if(userInfo) {
            setFormData({
                name: userInfo.name || '',
                phone: userInfo.phone || '',
                address: userInfo.address || ''
            });
        }
    }, [userInfo]);

    const toast = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            await onUpdateInfo(formData);
            setIsEditing(false);
            toast({
                title: 'Thành công',
                description: 'Thông tin đã được cập nhật',
                status: 'success',
                duration: 3000,
            });
        } catch (error: any) {
            toast({
                title: 'Lỗi',
                description: 'Không thể cập nhật thông tin',
                status: 'error',
                duration: 3000,
            });
        }
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast({
                title: 'Lỗi',
                description: 'Mật khẩu mới không khớp',
                status: 'error',
                duration: 3000,
            });
            return;
        }

        try {
            await onChangePassword(passwordData);
            onChangePasswordClose();
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            toast({
                title: 'Thành công',
                description: 'Mật khẩu đã được thay đổi',
                status: 'success',
                duration: 3000,
            });
        } catch (error: any) {
            toast({
                title: 'Lỗi',
                description: 'Không thể thay đổi mật khẩu',
                status: 'error',
                duration: 3000,
            });
        }
    };

    if(!userInfo) {
        return (
            <Box maxW="container.md" mx="auto" py={8}>
                <Card>
                    <CardBody>
                        <Text fontSize="lg" color="red.500">Vui lòng đăng nhập để xem thông tin cá nhân</Text>
                    </CardBody>
                </Card>
            </Box>
        )
    }

    return (
        <Box maxW="container.md" mx="auto" py={8}>
            <Card>
                <CardHeader>
                    <Flex justify="space-between" align="center">
                        <Text fontSize="2xl" fontWeight="bold">Thông tin cá nhân</Text>
                        <Stack direction="row" spacing={4}>
                            <Button
                                colorScheme="blue"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                            </Button>
                            <Button
                                colorScheme="purple"
                                onClick={onChangePasswordOpen}
                            >
                                Đổi mật khẩu
                            </Button>
                        </Stack>
                    </Flex>
                </CardHeader>

                <CardBody>
                    <Stack spacing={6}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input value={userInfo.email} isReadOnly />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Vai trò</FormLabel>
                            <Input value={userInfo.role} isReadOnly />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Họ tên</FormLabel>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                isReadOnly={!isEditing}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Số điện thoại</FormLabel>
                            <Input
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                isReadOnly={!isEditing}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Địa chỉ</FormLabel>
                            <Input
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                isReadOnly={!isEditing}
                            />
                        </FormControl>

                        <Divider />

                        <Flex justify="space-between">
                            <Text fontSize="sm" color="gray.500">
                                Ngày tạo: {new Date(userInfo.createdAt).toLocaleDateString()}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                                Cập nhật lần cuối: {new Date(userInfo.updatedAt).toLocaleDateString()}
                            </Text>
                        </Flex>

                        {isEditing && (
                            <Button colorScheme="green" onClick={handleSubmit}>
                                Lưu thay đổi
                            </Button>
                        )}
                    </Stack>
                </CardBody>
            </Card>

            {/* Modal đổi mật khẩu */}
            <Modal isOpen={isChangePasswordOpen} onClose={onChangePasswordClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Đổi mật khẩu</ModalHeader>
                    <ModalBody>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>Mật khẩu hiện tại</FormLabel>
                                <Input
                                    name="currentPassword"
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Mật khẩu mới</FormLabel>
                                <Input
                                    name="newPassword"
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                                <Input
                                    name="confirmPassword"
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onChangePasswordClose}>
                            Hủy
                        </Button>
                        <Button colorScheme="blue" onClick={handleChangePassword}>
                            Xác nhận
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default UserProfile;