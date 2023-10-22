import { Component, Input, OnInit } from '@angular/core';
import { SurveyQuestionModel } from '../../../../shared/survey/survey.component';
import { SurveyDashboardService } from '../../../../http-services/visitor/survey-dashboard.service';
import { ChartOptions } from '../../../../models/charts';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SurveyDashboardModel } from '../../../../models/visitor';
import { round } from '../../../../utils/shared-functions';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-survey-response-chart',
  templateUrl: './survey-response-chart.component.html',
  styleUrls: ['./survey-response-chart.component.scss']
})
export class SurveyResponseChartComponent implements OnInit {

  private readonly decimalPipe = new DecimalPipe('en-US');

  months = [
    {
      value: 1,
      name: 'Enero'
    },
    {
      value: 2,
      name: 'Febrero'
    },
    {
      value: 3,
      name: 'Marzo'
    },
    {
      value: 4,
      name: 'Abril'
    },
    {
      value: 5,
      name: 'Mayo'
    },
    {
      value: 6,
      name: 'Junio'
    },
    {
      value: 7,
      name: 'Julio'
    },
    {
      value: 8,
      name: 'Agosto'
    },
    {
      value: 9,
      name: 'Septiembre'
    },
    {
      value: 10,
      name: 'Octubre'
    },
    {
      value: 11,
      name: 'Noviembre'
    },
    {
      value: 12,
      name: 'Diciembre'
    }
  ];

  @Input()
  question: SurveyQuestionModel = null;

  gridOptions: GridOptions = {
    rowHeight: 30,
    // onGridReady: (event) => event.api.sizeColumnsToFit()
  };

  data: any[] = [];

  footerData = [];

  defaultColDef = {
    resizable: true
  };

  columnDefs: ColDef[] = [
    {
      headerName: 'Mes',
      field: 'monthName',
      width: 130,
    }
  ];

  loading = false;
  chartOptions: ChartOptions = {
    series: [],
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
      categories: [...this.months.map(it => it.name)]
    }
  };

  constructor(private readonly surveyDashboardService: SurveyDashboardService) {
  }

  private processChart(): void {
    this.loading = true;

    const months = this.months.map(it => it.value);
    this.chartOptions.title.text = `${this.question.fieldDescriptionEs}`;

    this.surveyDashboardService
      .getDataByQuestion(this.question.id)
      .then(surveyData => {
        console.log(surveyData);

        this.question.values.forEach(response => {

          const serie = {
            name: `${response.descriptionEs}`,
            data: []
          };

          months.forEach(month => {

            const quantity = surveyData
              .find(it => it.month == month && it.responseId == response.id)?.count ?? 0;

            serie.data.push(quantity)

          });

          this.chartOptions.series.push(serie);
        });

        this.processGrid(surveyData);

      })
      .catch(err => console.error(err))
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 3000)
      });
  }

  private processGrid(surveyData: SurveyDashboardModel[]): void {

    const totalResponses = surveyData
      .map(it => it.count)
      .reduce((a, b) => a + b, 0);

    this.months.forEach(month => {
      const row = {
        monthName: month.name
      };

      this.question.values.forEach(response => {
        const key = `response${response.id}`;

        row[key] = surveyData
          .find(it => it.month == month.value && it.responseId == response.id)?.count ?? 0;
      });

      const totalByMonth = surveyData
        .filter(it => it.month == month.value)
        .map(it => it.count)
        .reduce((a, b) => a + b, 0);

      const percentage = round((totalByMonth / totalResponses) * 100);

      row['total'] = `${this.decimalPipe.transform(percentage, '1.2-2')} %`

      this.data.push(row);
    });

    const footer = {
      monthName: 'Totales',
      total: totalResponses
    };

    this.question.values.forEach(it => {
      const key = `response${it.id}`;
      this.columnDefs.push({
        headerName: it.descriptionEs,
        field: key,
        width: 180,
        cellClass: 'ag-right-aligned-cell',
        headerClass: 'ag-right-aligned-header'
      });

      const totalByResponse = this.data
        .map(it => it[key])
        .reduce((a, b) => a + b, 0);

      const percentage = round((totalByResponse / totalResponses) * 100);

      footer[key] = `${this.decimalPipe.transform(percentage, '1.2-2')} %`
    });

    this.footerData = [footer]

    this.columnDefs.push({
      headerName: 'Totales',
      field: 'total',
      width: 110,
      cellClass: 'ag-right-aligned-cell'
    });
  }

  ngOnInit(): void {
    this.processChart();
  }

}
