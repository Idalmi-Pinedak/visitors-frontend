import { NgModule } from '@angular/core';
import { UserHttpService } from './user/user.http.service';
import { RoleHttpService } from './user/role.http.service';
import { ApplicationMenuHttpService } from './application/application-menu.http.service';
import { CountryService } from './common/country.service';
import { GenderService } from './common/gender.service';
import { StateService } from './common/state.service';
import { SurveyService } from './visitor/survey.service';
import { VisitorService } from './visitor/visitor.service';
import { DashboardService } from './visitor/dashboard.service';
import { ReportsService } from './visitor/reports.service';
import { RevenueDashboardService } from './visitor/revenue-dashboard.service';
import { SurveyDashboardService } from './visitor/survey-dashboard.service';
import { PricingService } from './visitor/pricing.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    UserHttpService,
    RoleHttpService,
    ApplicationMenuHttpService,
    CountryService,
    GenderService,
    StateService,
    SurveyService,
    VisitorService,
    DashboardService,
    ReportsService,
    RevenueDashboardService,
    SurveyDashboardService,
    PricingService
  ]
})
export class HttpServicesModule {
}
