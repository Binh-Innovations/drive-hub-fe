import axios from "axios"
const serviceStation = {
    getAllStation: async (page: number=0, limit: number=100): Promise<any>=> {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/station/`,{
                params: {
                    page, 
                    limit,
                }
            }
        )
        // console.log('response.data-----', response.data)
        return response.data
    }
}
export default serviceStation