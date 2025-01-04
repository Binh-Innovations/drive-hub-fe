import axiosClient from "@/apis/config/axiosClient.ts";

const serviceRoute = {
    getRouteById: async (id: string): Promise<any> => {
        return await axiosClient.get(`/route/${id}`)
    }
}
export default serviceRoute