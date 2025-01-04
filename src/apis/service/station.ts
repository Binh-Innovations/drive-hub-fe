import axiosClient from "@/apis/config/axiosClient.ts";
const serviceStation = {
    getAllStation: async (query: any = {}): Promise<any> => {
        return await axiosClient.get("/station", {params: query})
    }
}
export default serviceStation