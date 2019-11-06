export interface Customer {
  address?: string;
  attachments?: Buffer[];
  business_phone?: string;
  city?: string;
  company?: string;
  country_region?: string;
  email_address?: string;
  fax_number?: string;
  first_name?: string;
  home_phone?: string;
  id: number;
  job_title?: string;
  last_name?: string;
  mobile_phone?: string;
  notes?: string;
  state_province?: string;
  web_page?: string;
  zip_postal_code?: string;
}

export interface Employee {
  address?: string;
  attachments?: Buffer[];
  business_phone?: string;
  city?: string;
  company?: string;
  country_region?: string;
  email_address?: string;
  fax_number?: string;
  first_name?: string;
  home_phone?: string;
  id: number;
  job_title?: string;
  last_name?: string;
  mobile_phone?: string;
  notes?: string;
  state_province?: string;
  web_page?: string;
  zip_postal_code?: string;
}

export interface Privilege {
  id: number;
  privilege_name?: string;
}

export interface EmployeePrivilege {
  employee_id: number;
  privilege_id: number;
}

export interface InventoryTransactionType {
  id: number;
  type_name: string;
}

export interface Shipper {
  address?: string;
  attachments?: Buffer[];
  business_phone?: string;
  city?: string;
  company?: string;
  country_region?: string;
  email_address?: string;
  fax_number?: string;
  first_name?: string;
  home_phone?: string;
  id: number;
  job_title?: string;
  last_name?: string;
  mobile_phone?: string;
  notes?: string;
  state_province?: string;
  web_page?: string;
  zip_postal_code?: string;
}

export interface OrdersTaxStatus {
  id: number;
  tax_status_name: string;
}

export interface OrdersStatus {
  id: number;
  status_name: string;
}

export interface Order {
  customer_id?: number;
  employee_id?: number;
  id: number;
  notes?: string;
  order_date?: Date;
  paid_date?: Date;
  payment_type?: string;
  ship_address?: string;
  ship_city?: string;
  ship_country_region?: string;
  ship_name?: string;
  ship_state_province?: string;
  ship_zip_postal_code?: string;
  shipped_date?: Date;
  shipper_id?: number;
  shipping_fee?: string;
  status_id?: number;
  tax_rate?: number;
  tax_status_id?: number;
  taxes?: string;
}

export interface Product {
  attachments?: Buffer[];
  category?: string;
  description?: string;
  discontinued: number;
  id: number;
  list_price: string;
  minimum_reorder_quantity?: number;
  product_code?: string;
  product_name?: string;
  quantity_per_unit?: string;
  reorder_level?: number;
  standard_cost?: string;
  supplier_ids?: string;
  target_level?: number;
}

export interface PurchaseOrderStatus {
  id: number;
  status?: string;
}

export interface Supplier {
  address?: string;
  attachments?: Buffer[];
  business_phone?: string;
  city?: string;
  company?: string;
  country_region?: string;
  email_address?: string;
  fax_number?: string;
  first_name?: string;
  home_phone?: string;
  id: number;
  job_title?: string;
  last_name?: string;
  mobile_phone?: string;
  notes?: string;
  state_province?: string;
  web_page?: string;
  zip_postal_code?: string;
}

export interface PurchaseOrder {
  approved_by?: number;
  approved_date?: Date;
  created_by?: number;
  creation_date?: Date;
  expected_date?: Date;
  id: number;
  notes?: string;
  payment_amount?: string;
  payment_date?: Date;
  payment_method?: string;
  shipping_fee: string;
  status_id?: number;
  submitted_by?: number;
  submitted_date?: Date;
  supplier_id?: number;
  taxes: string;
}

export interface InventoryTransaction {
  comments?: string;
  customer_order_id?: number;
  id: number;
  product_id: number;
  purchase_order_id?: number;
  quantity: number;
  transaction_created_date?: Date;
  transaction_modified_date?: Date;
  transaction_type: number;
}

export interface Invoice {
  amount_due?: string;
  due_date?: Date;
  id: number;
  invoice_date?: Date;
  order_id?: number;
  shipping?: string;
  tax?: string;
}

export interface OrderDetailsStatus {
  id: number;
  status_name: string;
}

export interface OrderDetail {
  date_allocated?: Date;
  discount: number;
  id: number;
  inventory_id?: number;
  order_id: number;
  product_id?: number;
  purchase_order_id?: number;
  quantity: string;
  status_id?: number;
  unit_price?: string;
}

export interface PurchaseOrderDetail {
  date_received?: Date;
  id: number;
  inventory_id?: number;
  posted_to_inventory: number;
  product_id?: number;
  purchase_order_id: number;
  quantity: string;
  unit_cost: string;
}

export interface SalesReport {
  default: number;
  display?: string;
  filter_row_source?: string;
  group_by: string;
  title?: string;
}

export interface String {
  string_data?: string;
  string_id: number;
}

