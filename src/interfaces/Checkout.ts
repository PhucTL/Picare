import { Cart } from "./Cart";
import { Customer } from "./User";
import { Voucher } from "./Voucher";

export interface Checkout {
  customer: Customer;
  cart: Cart;
  user: Personal;
  location: Location;
  discount_codes: DiscountCode[];
  gateway: string;
  shipping_lines: ShippingLine[];
  is_cod_gateway: boolean;
}

export interface DiscountCode {
  code: Voucher;
  is_coupon_code: boolean;
}
export interface Personal {
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface Location {
  country: Country;
  province: Province;
  district: District;
  ward: Ward;
  address: string;
}
// hien tai dang thieu api ward
export interface Country {
  code: string;
  id: string;
  name: string;
}
export interface Province {
  code: string;
  country_id: string;
  id: string;
  name: string;
}
export interface District {
  id: string;
  name: string;
  code: string;
  province_id: string;
}

export interface Ward {
  id: string;
  name: string;
  code: string;
  district_id: string;
}

export interface ShippingLine {
  code: string;
  price: number;
  source?: string;
  title: string;
}
