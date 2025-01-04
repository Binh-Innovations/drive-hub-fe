

export interface IGetAllTicketAvailable {
    seat: ISeatTicket 
    status: string 
    isAvailable: boolean

}


export interface ISeatTicket {
   
    id: number,
    vehicleId: number,
    rowLabel: string ,// "7"

    columnLabel: string,// "A"
    seatCode: string, /// "7A"
    seatType: number
}
