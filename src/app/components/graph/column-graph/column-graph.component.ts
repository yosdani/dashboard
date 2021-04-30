import {Component, Input, OnInit} from '@angular/core';
import {ChartType} from "chart.js";
import {Color} from "ng2-charts";

@Component({
  selector: 'app-column-graph',
  templateUrl: './column-graph.component.html',
  styleUrls: ['./column-graph.component.scss']
})
export class ColumnGraphComponent implements OnInit {
  @Input() barChartData;
  @Input() barChartLabels;
  @Input() percentage: number;
  public barCharOptions: any;

  constructor() {
  }

  public barChartType: ChartType  = 'bar';
  public barChartLegend = true;
  public chartColors: Color[] = [
    {
      backgroundColor: '#368CDC'
    },
    {
      backgroundColor: '#83C556'
    },
    {
      backgroundColor: '#ED7D31'
    }
  ];

  ngOnInit() {

    this.barCharOptions = {
      scaleShowVerticalLines: true,
      responsive: true,
      scales: {
        xAxes: [{
          barPercentage : this.percentage,
          ticks: {
            autoSkip: false,
            maxRotation: 60,
            minRotation: 60
          }
        }]
      }
    }
  }
}
