import {create} from "zustand";

export interface UserInfo {
	id: number;
	email: string;
	role: string;
	name: string | null;
	phone: string | null;
	address: string | null;
	createdAt: string;
	updatedAt: string;
}

interface IUserState {
	userInfo: UserInfo | null,
	setUserInfo: (userInfo: UserInfo | null) => void
}

const useUserInfo = create<IUserState>((set) => ({
	userInfo: null,
	setUserInfo: (userInfo) => set({userInfo})
}));

export default useUserInfo;