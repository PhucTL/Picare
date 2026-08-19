export interface Coupon {
  voucher: Voucher[];
  length: number;
}

export interface Voucher {
  code: string;
  ends_at: string; // ISO date string
  id: number;
  minimum_order_amount: number;
  starts_at: string; // ISO date string
  status: "enabled" | "disabled"; // Assuming possible statuses
  usage_limit: number;
  value: number;
  times_used: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  is_new_coupon: boolean;
  max_amount_apply: number;
  once_per_customer: boolean;
  take_type: "percentage" | "fixed_amount"; // Assuming possible discount types
}
