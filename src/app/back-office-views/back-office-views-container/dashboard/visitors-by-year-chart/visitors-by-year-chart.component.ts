import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../http-services/visitor/dashboard.service';
import { DashboardResponseModel } from '../../../../models/visitor';
import { ChartOptions } from '../../../../models/charts';
import { MONTHS } from '../../../../constants/constants';

@Component({
  selector: 'app-visitors-by-year-chart',
  templateUrl: './visitors-by-year-chart.component.html',
  styleUrls: ['./visitors-by-year-chart.component.scss']
})
export class VisitorsByYearChartComponent implements OnInit {

  loading = false;
  chartOptions: ChartOptions = {
    series: [
      {
        name: 'Visitantes',
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
      text: `Visitantes en el año actual: 0`,
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

  constructor(private readonly dashboardService: DashboardService) {
  }

  private buildChartData(response: DashboardResponseModel[]): void {
    const data: number[] = [];
    const categories: string[] = [];

    let total = 0;

    response.forEach(it => {
      data.push(it.count)
      categories.push(MONTHS.get(it.month))
      total += it.count;
    });

    this.chartOptions.series[0].data = [...data];
    this.chartOptions.xaxis.categories = [...categories];
    this.chartOptions.title.text = `Visitantes en el año actual: ${total}`;
  }

  ngOnInit(): void {
    this.loading = true;
    this.dashboardService
      .visitorsByYear()
      .then(response => this.buildChartData(response))
      .catch(err => console.error(err))
      .finally(() => this.loading = false)
  }

}
