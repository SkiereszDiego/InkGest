export interface Session {
    id?: string;
    client?: string;
    session_date?: string;
    tattoo?: string;
    value?: string;
    tattooArtist?: string;
    duration?: string;
    totalCost?: string;
    supplyUsed?: { description: string; quantity: number; price: number }[];
}