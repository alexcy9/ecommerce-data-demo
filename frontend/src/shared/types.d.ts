export interface Data {
  invoiceNo: string;
  stockCode: string;
  description: string;
  quantity: number;
  invoiceDate: string;
  unitPrice: number;
  customerId: string;
  country: string;
  _links: {self: {href: string}};
}

export interface PageMetadata {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface SearchParams {
  field: string;
  term: string;
}