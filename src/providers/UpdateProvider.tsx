import React, {FC, useEffect} from "react";
import useUserInfo from "@/hooks/useUserInfo.ts";
import userService from "@/apis/service/userService.ts";

type UpdaterProviderProps = {
	children: React.ReactNode;
}

const UpdaterProvider: FC<UpdaterProviderProps> = ({ children }) => {
	const {userInfo, setUserInfo} = useUserInfo();

	const updateUserInfo = async () => {
		try {
			const user = await userService.getUserInfo();
			setUserInfo(user);
		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		if(!userInfo) {
			updateUserInfo().then();
		}
	}, [userInfo]);
	return (
		<>
			{children}
		</>
	)
}

export default UpdaterProvider;