import { Component, OnInit } from '@angular/core';
import { ChartOptions } from '../../../../models/charts';
import { DashboardResponseModel } from '../../../../models/visitor';
import { MONTHS } from '../../../../constants/constants';
import { RevenueDashboardService } from '../../../../http-services/visitor/revenue-dashboard.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-revenue-by-year-chart',
  templateUrl: './revenue-by-year-chart.component.html',
  styleUrls: ['./revenue-by-year-chart.component.scss']
})
export class RevenueByYearChartComponent implements OnInit {

  private readonly decimalPipe = new DecimalPipe('en-US');

  loading = false;
  chartOptions: ChartOptions = {
    series: [
      {
        name: 'Recaudación',
        data: []
      }
    ],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: `Recaudación en el año actual: Q 0.00`,
      align: 'center',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    xaxis: {
      categories: []
    }
  };


  constructor(private readonly revenueDashboardService: RevenueDashboardService) { }

  private buildChartData(response: DashboardResponseModel[]): void {
    const data: number[] = [];
    const categories: string[] = [];

    let total = 0;

    response.forEach(it => {
      data.push(it.amount)
      categories.push(MONTHS.get(it.month))
      total += it.amount;
    });

    this.chartOptions.series[0].data = [...data];
    this.chartOptions.xaxis.categories = [...categories];
    this.chartOptions.title.text = `Recaudación en el año actual: Q ${this.decimalPipe.transform(total, '1.2-2')}`;
  }

  ngOnInit(): void {
    this.loading = true;
    this.revenueDashboardService
      .revenueByYear()
      .then(response => this.buildChartData(response))
      .catch(err => console.error(err))
      .finally(() => this.loading = false)
  }

}
