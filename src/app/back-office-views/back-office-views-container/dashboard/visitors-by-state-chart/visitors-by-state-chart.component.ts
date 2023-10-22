import { Component, OnInit } from '@angular/core';
import { PieChartOptions } from '../../../../models/charts';
import { DashboardService } from '../../../../http-services/visitor/dashboard.service';
import { DashboardResponseModel } from '../../../../models/visitor';

@Component({
  selector: 'app-visitors-by-state-chart',
  templateUrl: './visitors-by-state-chart.component.html',
  styleUrls: ['./visitors-by-state-chart.component.scss']
})
export class VisitorsByStateChartComponent implements OnInit {

  loading = false;
  totalVisitors = 0;
  chartOptions: PieChartOptions = {
    series: [],
    chart: {
      width: 500,
      type: "donut"
    },
    labels: [],
    fill: {
      type: "gradient"
    },
    title: {
      text: 'Visitantes por departamento',
      align: 'center'
    },
    responsive: [
      {
        breakpoint: 580,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ],
    colors: [
      "#3B93A5",
      "#F7B844",
      "#ADD8C7",
      "#EC3C65",
      "#CDD7B6",
      "#C1F666",
      "#D43F97",
      "#1E5D8C",
      "#421243",
      "#7F94B0",
      "#EF6537",
      "#C0ADDB"
    ]
  }

  constructor(private readonly dashboardService: DashboardService) {
  }

  private buildChartData(response: DashboardResponseModel[]): void {
    let total = 0;
    const series: number[] = [];
    const labels: string[] = [];

    response.forEach(it => {
      series.push(it.count)
      labels.push(it.stateName)
      total += it.count;
    });

    this.chartOptions.labels = [...labels];
    this.chartOptions.series = [...series];
    this.totalVisitors = total;
  }

  ngOnInit(): void {
    this.loading = true;
    this.dashboardService
      .visitorsByState()
      .then(response => this.buildChartData(response))
      .catch(err => console.error(err))
      .finally(() => this.loading = false)
  }

}
