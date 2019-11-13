export interface Customer {
  id: number
  company?: string
  last_name?: string
  first_name?: string
  email_address?: string
  job_title?: string
  business_phone?: string
  home_phone?: string
  mobile_phone?: string
  fax_number?: string
  address?: string
  city?: string
  state_province?: string
  zip_postal_code?: string
  country_region?: string
  web_page?: string
  notes?: string
  attachments?: Buffer[]
}

export interface Employee {
  id: number
  company?: string
  last_name?: string
  first_name?: string
  email_address?: string
  job_title?: string
  business_phone?: string
  home_phone?: string
  mobile_phone?: string
  fax_number?: string
  address?: string
  city?: string
  state_province?: string
  zip_postal_code?: string
  country_region?: string
  web_page?: string
  notes?: string
  attachments?: Buffer[]
}

export interface Privilege {
  id: number
  privilege_name?: string
}

export interface EmployeePrivilege {
  employee_id: number
  privilege_id: number
}

export interface InventoryTransactionType {
  id: number
  type_name: string
}

export interface Shipper {
  id: number
  company?: string
  last_name?: string
  first_name?: string
  email_address?: string
  job_title?: string
  business_phone?: string
  home_phone?: string
  mobile_phone?: string
  fax_number?: string
  address?: string
  city?: string
  state_province?: string
  zip_postal_code?: string
  country_region?: string
  web_page?: string
  notes?: string
  attachments?: Buffer[]
}

export interface OrdersTaxStatus {
  id: number
  tax_status_name: string
}

export interface OrdersStatus {
  id: number
  status_name: string
}

export interface Order {
  id: number
  employee_id?: number
  customer_id?: number
  order_date?: Date
  shipped_date?: Date
  shipper_id?: number
  ship_name?: string
  ship_address?: string
  ship_city?: string
  ship_state_province?: string
  ship_zip_postal_code?: string
  ship_country_region?: string
  shipping_fee?: string
  taxes?: string
  payment_type?: string
  paid_date?: Date
  notes?: string
  tax_rate?: number
  tax_status_id?: number
  status_id?: number
}

export interface Product {
  supplier_ids?: string
  id: number
  product_code?: string
  product_name?: string
  description?: string
  standard_cost?: string
  list_price: string
  reorder_level?: number
  target_level?: number
  quantity_per_unit?: string
  discontinued: number
  minimum_reorder_quantity?: number
  category?: string
  attachments?: Buffer[]
}

export interface PurchaseOrderStatus {
  id: number
  status?: string
}

export interface Supplier {
  id: number
  company?: string
  last_name?: string
  first_name?: string
  email_address?: string
  job_title?: string
  business_phone?: string
  home_phone?: string
  mobile_phone?: string
  fax_number?: string
  address?: string
  city?: string
  state_province?: string
  zip_postal_code?: string
  country_region?: string
  web_page?: string
  notes?: string
  attachments?: Buffer[]
}

export interface PurchaseOrder {
  id: number
  supplier_id?: number
  created_by?: number
  submitted_date?: Date
  creation_date?: Date
  status_id?: number
  expected_date?: Date
  shipping_fee: string
  taxes: string
  payment_date?: Date
  payment_amount?: string
  payment_method?: string
  notes?: string
  approved_by?: number
  approved_date?: Date
  submitted_by?: number
}

export interface InventoryTransaction {
  id: number
  transaction_type: number
  transaction_created_date?: Date
  transaction_modified_date?: Date
  product_id: number
  quantity: number
  purchase_order_id?: number
  customer_order_id?: number
  comments?: string
}

export interface Invoice {
  id: number
  order_id?: number
  invoice_date?: Date
  due_date?: Date
  tax?: string
  shipping?: string
  amount_due?: string
}

export interface OrderDetailsStatus {
  id: number
  status_name: string
}

export interface OrderDetail {
  id: number
  order_id: number
  product_id?: number
  quantity: string
  unit_price?: string
  discount: number
  status_id?: number
  date_allocated?: Date
  purchase_order_id?: number
  inventory_id?: number
}

export interface PurchaseOrderDetail {
  id: number
  purchase_order_id: number
  product_id?: number
  quantity: string
  unit_cost: string
  date_received?: Date
  posted_to_inventory: number
  inventory_id?: number
}

export interface SalesReport {
  group_by: string
  display?: string
  title?: string
  filter_row_source?: string
  default: number
}

export interface String {
  string_id: number
  string_data?: string
}
