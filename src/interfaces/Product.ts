export interface Option {
  //  ? nếu ko đụng thì có thể cân nhắc bỏ luôn
  name: string; //  ? chỉ có 1 cái số lượng và 1 cái là quy cách?
  id: number;
  position: number;
  product_id: number;
}

export interface Inventory_advance {
  //  ? Docs ko nois ro cai nay nen se can hoi lai
  qty_available: number;
  qty_onhand: number;
  qty_commited: number;
  qty_incoming: number;
}

export interface Variant {
  //barcode: string | null,
  compare_at_price: number; //cái này là giá chưa được giảm (nếu có)
  created_at: string;
  //fulfillment_service: string | null,
  grams: number;
  id: number;
  inventory_management: string; //"haravan", null,  ?
  inventory_policy: string; //'deny', 'continue'                              ? cái này có phải hết hàng vẫn đặt được ko ấy nhỉ?
  inventory_quantity: number;
  //old_inventory_quantity: number,                                           ?
  inventory_quantity_adjustment: string | null;
  //position: number,                                                         ? mặc định mình ko dùng variance nên chỉ có 1 position duy nhất à
  price: number;
  product_id: number;
  requires_shipping: boolean; //                                              ? bộ có sản phầm ko cần giao hàng à?
  sku: string | null; //                                                      ? Chắc chắn cần nhưng có sản phẩm chưa có
  taxable: boolean; //                                                        ? đang ko hiểu sao 91 cái thì chỉ có  1 cái là false
  title: string;
  updated_at: string;
  image_id: string | null;
  option1: string;
  inventory_advance: Inventory_advance | null;
}

export interface Image {
  created_at: string;
  id: number;
  position: number;
  product_id: number;
  src: string;
  updated_at: string;
  filename: string;
}

export interface Product {
  body_html: string;
  handle: string;
  id: string;
  images: Image[] | undefined;
  product_type: string;
  published_at: string;
  published_scope: string; //cái này sẽ có giá trị là "global", "pos", "web"
  tags: string | null;
  template_suffix: string; //"product" và "product.hoa_chat"
  title: string;
  updated_at: string;
  variants: Variant[];
  vendor: string;
  options: Option[] | null;
  only_hide_from_list: boolean;
  not_allow_promotion: boolean;
}
