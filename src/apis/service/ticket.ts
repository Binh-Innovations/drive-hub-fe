import axiosClient from "@/apis/config/axiosClient.ts";
const serviceTicket = {
    getAllAvailableTicket: async (tripId: number): Promise<any> => {
        return await axiosClient.get(`/ticket/available/${tripId}`)
    },

    bookTicket: async (data: any): Promise<any> => {
        return await axiosClient.post('/ticket/book/online', data)
    },

    getMyTickets: async (query: any): Promise<any> => {
        return await axiosClient.get('/ticket/my-tickets', { params: query })
    }
}


export default serviceTicket