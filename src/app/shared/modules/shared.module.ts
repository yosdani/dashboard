import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [DetailExportacionProductoComponent],
  imports: [
    CommonModule,MatIconModule,FormsModule,MatDialogModule,NgbModule
  ],
  exports: [DetailExportacionProductoComponent]
})
export class SharedModule { }
