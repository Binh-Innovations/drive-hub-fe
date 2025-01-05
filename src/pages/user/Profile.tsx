import useUserInfo, {UserInfo} from "@/hooks/useUserInfo.ts";
import UserProfile from "@/pages/user/components/UserProfile.tsx";
import userService from "@/apis/service/userService.ts";

const Profile = () => {
    const {userInfo, setUserInfo} = useUserInfo();
    const handleUpdateInfo = async (data: Partial<UserInfo>) => {
        // Gọi API cập nhật thông tin
        try {
            const user = await userService.updateUser(data);
            setUserInfo(user);
        } catch (error) {
            throw error;
        }
    };

    const handleChangePassword = async (data: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }) => {
        // Gọi API đổi mật khẩu
        try {
            await userService.changePassword({
                oldPassword: data.currentPassword,
                newPassword: data.newPassword,
            })
        } catch (error) {
            throw error;
        }
    };

    return (
        <UserProfile
            userInfo={userInfo}
            onUpdateInfo={handleUpdateInfo}
            onChangePassword={handleChangePassword}
        />
    );
};

export default Profile;