import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnGraphComponent } from './column-graph/column-graph.component';
import { ChartsModule } from 'ng2-charts';
import { ColumnGraphFfComponent } from './column-graph-ff/column-graph-ff.component';
import { PieGraphComponent } from './pie-graph/pie-graph.component';
import { HorizontalGraphComponent } from './horizontal-graph/horizontal-graph.component';
import {GaugeGraphComponent} from "./gauge-graph/gauge-graph.component";

@NgModule({
  declarations: [ColumnGraphComponent, ColumnGraphFfComponent, PieGraphComponent, HorizontalGraphComponent,
    GaugeGraphComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [ColumnGraphComponent,
            ColumnGraphFfComponent, PieGraphComponent, HorizontalGraphComponent,GaugeGraphComponent]
})
export class GraphModule { }
