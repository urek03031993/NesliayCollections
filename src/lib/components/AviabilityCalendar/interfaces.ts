 export interface Rental { 
    id: number, 
    start: string, 
    end: string, 
    quantity: number, 
    name: string 
}


export interface CalendarProps {
    totalQuantity: number;
    rentals: Rental[];
    onDateSelect: null;
}