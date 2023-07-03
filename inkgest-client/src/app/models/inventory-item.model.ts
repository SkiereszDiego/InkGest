export interface InventoryItem {
  _id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  price: number;
  purchase_date: Date;
  quantity: number;
  expiry_date?: Date;
}
