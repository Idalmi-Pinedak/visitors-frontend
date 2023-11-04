export interface SurveyTemplateDetailModel {
  id: number;
  fieldDescriptionEs: string;
  fieldDescriptionEn: string;
  values: SurveyTemplateDetailValueModel[];
}

export interface SurveyTemplateDetailValueModel {
  id: number;
  descriptionEs: string;
  descriptionEn: string;
}

export interface VisitorSurveyModel {
  surveyTemplateDetailId: number;
  responses: number[];
}

export interface VisitorModel {
  visitorName: string;
  age: number;
  genderId: number;
  countryId: number;
  stateId: number;
  entranceFee?: number;
  visitorGroupId?: number;
}

export interface VisitorGroupModel {
  id?: number;
  checkInDate?: string;
  checkOutDate?: string;
  totalVisitors?: number;
  totalAmount?: number;
  visitors?: VisitorModel[];
  survey?: VisitorSurveyModel[];
}

export interface DashboardResponseModel {
  month: number;
  stateName: string;
  countryName?: string;
  count: number;
  amount?: number;
}

export interface IncomeStatementModel {
  date: string;
  amount: number;
}

export interface SurveyDashboardModel {
  month: number;
  responseId: number;
  count: number;
}

export interface PricingModel {
  id: number;
  description: string;
  entranceFee: number;
}
