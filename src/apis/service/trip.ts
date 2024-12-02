import axios from "axios"
const serviceTrip = {
    getAllTrip: async (page: number=0, limit: number=10, startStationId?: number, endStationId?: number, startTime?: string, endTime?: string ): Promise<any>=> {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/trip/`,{
                params: {
                    page, 
                    limit,
                    startStationId,
                    endStationId,
                    startTime,
                    endTime
                }
            }
        )
        // console.log('response.data-----', response.data)
        return response.data
    }
}
export default serviceTrip