import axios from "axios"
const serviceTicket = {
    getAllAvailableTicket: async (tripId: number) => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/ticket/available/${tripId}`);
        // console.log('response.data line 5------', response.data )
        return response.data;
    }
}


export default serviceTicket