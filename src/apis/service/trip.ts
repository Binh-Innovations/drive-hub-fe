import axiosClient from "@/apis/config/axiosClient.ts";

const serviceTrip = {
    getAllTrip: async (query: any = {}): Promise<any> => {
        return await axiosClient.get("/trip", {
            params: {
                ...query,
                status: "scheduled"
            }
        })
    }
}
export default serviceTrip