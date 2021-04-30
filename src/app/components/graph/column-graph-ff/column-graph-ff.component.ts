import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-column-graph-ff',
  templateUrl: './column-graph-ff.component.html',
  styleUrls: ['./column-graph-ff.component.scss']
})
export class ColumnGraphFfComponent implements OnInit {
  @Input()
  barChartData;
  @Input()
  barChartLabels;

  constructor() { }

  public barChartOptions = {
    tooltips:{
      mode: 'index',
    },
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90
        }
      }]
    }
  };
  public barChartType = 'line';
  public barChartLegend = true;
  public chartColors: any[] = [
    { // first color
      backgroundColor: '#368CDC',
      pointHoverBackgroundColor: '#368CDC',
    },
    { // second color
      backgroundColor: '#83C556',
      pointHoverBackgroundColor: '#83C556',
    }
  ];


  ngOnInit() {}

}
