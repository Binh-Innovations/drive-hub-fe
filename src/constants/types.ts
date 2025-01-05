export interface Trip {
    id: number;
    departureTime: string;
    arrivalTime: string;
    status: string;
    price: number;
    route?: any;
    vehicle?: any;
}

export interface Ticket {
    id: string;
    seatCode: string;
    bookingCode: string;
    bookingTime: string;
    status: string;
    trip: Trip;
    qrCode: string;
}