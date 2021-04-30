import { GraphModule } from './../../components/widgets/graph/graph.module';
import { ExportService } from './../../services/export.service';
import { Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainviewComponent } from './mainview.component';
import { MainviewRoutingModule } from './mainview-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LeyendaModule} from '../../components/widgets/leyenda/leyenda.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {SpinnerModule} from '../../components/widgets/spinner/spinner.module';
import { DetailExportacionProductoComponent } from '../exportaciones/detail-exportacion-producto/detail-exportacion-producto.component';
import {SpinnerXlModule} from '../../components/widgets/spinner-xl/spinner-xl.module';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared';
import { HorizontalGraphComponent } from 'src/app/components/widgets/graph/horizontal-graph/horizontal-graph.component';
@NgModule({
  declarations: [MainviewComponent],
  imports: [
    CommonModule, NgbModule,FormsModule,MatDialogModule, SharedModule,GraphModule,
    MainviewRoutingModule, LeyendaModule, MatFormFieldModule, MatSelectModule, SpinnerModule, SpinnerXlModule, MatButtonModule,MatIconModule
  ],
  entryComponents: [DetailExportacionProductoComponent],
  providers: [ExportService]
})
export class MainviewModule { }
