import axiosClient from "@/apis/config/axiosClient.ts";

const userService = {
	
	login: async (email: string, password: string): Promise<any> => {
		return await axiosClient.post("/auth/login", { email, password });
	},
	
	
	register: async (email: string, password: string): Promise<any> => {
		return await axiosClient.post("/auth/register", { email, password });
	},

	getUserInfo: async (): Promise<any> => {
		return await axiosClient.get("/auth/me");
	},

	updateUser: async (data: any): Promise<any> => {
		return await axiosClient.put("/auth/user/update-user", data);
	},

	changePassword: async (data: any): Promise<any> => {
		return await axiosClient.put("/auth/user/change-password", data);
	},
}

export default userService;