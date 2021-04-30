import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.scss']
})
export class PieGraphComponent implements OnInit {

  @Input() pieChartData;
  @Input() pieChartLabels;

  public barCharOptions: any;
  public chartColors: any[] = [
    {
      backgroundColor: ["#368CDC", "#83C556", "#ED7D31"],
      pointHoverBackgroundColor: ["#368CDC", "#83C556", "#ED7D31"],
      hoverBorderColor: 'black'
    }
  ];

  constructor() {
  }

  public barChartType = 'pie';
  public barChartLegend = true;

  ngOnInit() {
    this.barCharOptions = {
      scaleShowVerticalLines: true,
      responsive: true,
      legend: {
        position: 'left'
      },
      tooltips: {
        callbacks: {
          label: function (tooltip, data) {
            let i = tooltip.index;
            let total: number = 0;
            data.datasets[0]["data"].forEach((d) => {
              total += Number(d);
            });
            return String(
              data.labels[i] +
                " : " +
                data.datasets[0]["data"][i] +
                " (" +
                (
                  (Number(data.datasets[0]["data"][i]) / total) *
                  100
                ).toFixed(2) +
                "%)"
            );
          },
        }
      }
    }
  }

}
