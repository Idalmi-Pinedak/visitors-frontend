import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexTitleSubtitle,
  ApexStroke,
  ApexXAxis,
  ApexLegend,
  ApexPlotOptions,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  title?: ApexTitleSubtitle;
  plotOptions?: ApexPlotOptions;
  legend?: ApexLegend;
  colors?: string[];
};

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors?: string[];
  fill?: ApexFill;
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
};
