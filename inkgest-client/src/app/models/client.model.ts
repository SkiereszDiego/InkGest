export interface Client {
    id?: string;
    client?: string;
    client_date?: string;
    tattoo?: string;
    value?: string;
    tattooArtist?: string;
    duration?: string;
    totalCost?: string;
    supplyUsed?: { description: string; quantity: number; price: number }[];
}