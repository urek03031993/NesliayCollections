 export interface Rental { 
    id: number, 
    start: string, 
    end: string, 
    quantity: number, 
    state: "prebook" | "reserved"
}


export interface CalendarProps {
    totalQuantity: number;
    rentals: Rental[];
    onDateSelect: null;
}