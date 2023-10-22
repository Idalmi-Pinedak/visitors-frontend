import { Component, OnInit } from '@angular/core';
import { RevenueDashboardService } from '../../../http-services/visitor/revenue-dashboard.service';

@Component({
  selector: 'app-revenue-dashboard',
  templateUrl: './revenue-dashboard.component.html',
  styleUrls: ['./revenue-dashboard.component.scss']
})
export class RevenueDashboardComponent implements OnInit {

  loadingRevenueToday = true;
  loadingRevenueInTheMonth = true;
  loadingRevenueInTheLastMonth = true;

  amountRevenueToday = 0;
  amountRevenueInTheMonth = 0;
  amountRevenueInTheLastMonth = 0;

  constructor(
    private readonly revenueDashboardService: RevenueDashboardService
  ) {

  }

  ngOnInit(): void {
    this.revenueDashboardService
      .revenueToday()
      .then(amount => this.amountRevenueToday = amount)
      .catch(err => console.error(err))
      .finally(() => this.loadingRevenueToday = false);

    this.revenueDashboardService
      .revenueInTheMonth()
      .then(amount => this.amountRevenueInTheMonth = amount)
      .catch(err => console.error(err))
      .finally(() => this.loadingRevenueInTheMonth = false);

    this.revenueDashboardService
      .revenueInTheLastMonth()
      .then(amount => this.amountRevenueInTheLastMonth = amount)
      .catch(err => console.error(err))
      .finally(() => this.loadingRevenueInTheLastMonth = false);
  }

}
