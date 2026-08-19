export interface Customer {
  accepts_marketing: boolean;
  addresses: any[]; // You can replace `any` with a more specific address type if needed
  created_at: string;
  default_address: null | any; // Replace `any` with a proper address type if available
  email: string | null;
  phone: string;
  first_name: string | null;
  id: string;
  last_name: string | null;
  last_order_id: number | null;
  last_order_name: string | null;
  orders_count: number;
  state: string;
  tags: string | null;
  updated_at: string;
  verified_email: boolean;
  group_name: string | null;
  last_order_date: string | null;
}
