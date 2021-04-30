import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-graph',
  templateUrl: './horizontal-graph.component.html',
  styleUrls: ['./horizontal-graph.component.scss']
})
export class HorizontalGraphComponent implements OnInit {

  @Input() barChartData;
  @Input() barChartLabels;
  @Input() percentage: number;
  @Input() display: boolean;
  public barCharOptions: any;

  constructor() {
    this.display = false;
  }

  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public chartColors: any[] = [
    { // first color
      backgroundColor: '#368CDC'
    },
    { // second color
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
          stacked: true,
          ticks: {
            autoSkip: false,
            maxRotation: 60,
            minRotation: 60
          }
        }],
        yAxes: [{
          ticks: { display: this.display }
        }]
      }
    }
  }

}
