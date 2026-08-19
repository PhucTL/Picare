import { DiscountCode, ShippingLine } from "./Checkout";

export interface OrderListItem {
  id: string;
  created_at: string;
  total_price: number;
  order_processing_status: string;
  line_items: LineItem[];
  financial_status: string;
  discount_codes: DiscountCode[];
  billing_address: BillingAddress;
  gateway: string;
  subtotal_price: number;
  fulfillments: Fulfillment[];
  total_discounts: number;
  shipping_lines: ShippingLine[];
}

interface Image {
  src: string;
}

interface BillingAddress {
  address1: string;
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  country_code: string;
  province: string;
  province_code: string;
  district_code: string;
  district: string;
  ward_code: string;
  ward: string;
}

export interface LineItem {
  fulfillable_quantity: number;
  fulfillment_service: string | null;
  fulfillment_status: string;
  id: number;
  price: number;
  price_original: number;
  product_id: number;
  quantity: number;
  sku: string | null;
  title: string;
  variant_id: number;
  variant_title: string;
  vendor: string;
  type: string;
  name: string;
  image: Image;
}
export interface Fulfillment {
  created_at: string;
  id: number;
  order_id: number;
  status: string;
  tracking_company: string;
  tracking_company_code: string;
  tracking_number: string;
  tracking_url: string;
  updated_at: string;
  province: string | null;
  province_code: string | null;
  district: string | null;
  district_code: string | null;
  ward: string | null;
  ward_code: string | null;
  cod_amount: number;
  carrier_status_name: string;
  carrier_cod_status_name: string;
  carrier_status_code: string;
  carrier_cod_status_code: string;
  location_id: number;
  location_name: string;
  note: string | null;
  carrier_service_package_name: string;
  ready_to_pick_date: string;
  picking_date: string | null;
  delivering_date: string | null;
  delivered_date: string | null;
  return_date: string | null;
  not_meet_customer_date: string | null;
  waiting_for_return_date: string | null;
  cod_paid_date: string | null;
  cod_receipt_date: string | null;
  cod_pending_date: string | null;
  cod_not_receipt_date: string | null;
  cancel_date: string | null;
  real_shipping_fee: number;
  shipping_notes: string | null;
}
