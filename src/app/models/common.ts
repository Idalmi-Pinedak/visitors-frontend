export interface GenericDialogData {
  id?: number;
  operationType?: string;
  payload?: any;
}

export interface GenderModel {
  id?: number;
  description: string;
}

export interface CountryModel {
  id: number;
  countryName: string;
}

export interface StateModel {
  id: number;
  stateName: string;
}

export interface ReportFiltersModel {
  startDate?: string;
  endDate?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface QueryPageModel<T> {
  content: T[];
  totalElements: number;
}
