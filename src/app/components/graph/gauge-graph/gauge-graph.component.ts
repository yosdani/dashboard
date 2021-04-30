import {Input} from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-gauge-graph',
    templateUrl: './gauge-graph.component.html',
    styleUrls: ['./gauge-graph.components.scss']
})
export class GaugeGraphComponent implements OnInit {

    @Input() gaugeChartData;
    @Input() gaugeChartLabels;
    @Input() gaugechartColors;

    public barCharOptions: any;
     public chartColors: any[];

    constructor() {

    }

    public barChartType = 'doughnut';
    public barChartLegend = true;

    ngOnInit() {
        this.chartColors = [
            {
                backgroundColor: this.gaugechartColors,
                hoverBorderColor: 'black'
            }];
        this.barCharOptions = {
           scaleShowVerticalLines: true,
            responsive: true,
            legend: {
                labels: {
                    fontColor: "black",
                    fontSize: 14,
                },
            },
            circumference: Math.PI,
            rotation: -1 * Math.PI,
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
        };
    }
}