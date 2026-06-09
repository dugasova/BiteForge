export interface Order {
  id: number;
  date: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
  totalPrice: number;
  totalKcal: number;
  fastDelivery: boolean;
  ingredients: Record<string, number>;
}
