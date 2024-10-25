export interface DropdownType {
  label: string;
  value: string;
}
export interface Pagination {
  filterTerm?: string;
  pageNumber?: number;
  pageSize?: number;
}
export interface KeywordQuery extends Pagination {
  kewword?: string;
  resourceTypeId?: number;
}
