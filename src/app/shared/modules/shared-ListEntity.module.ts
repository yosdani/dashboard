import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ListEntityComponent} from "../../components/widgets/list-entity/list-entity.component";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [ListEntityComponent],
  imports: [
    CommonModule, FormsModule, MatDialogModule, MatSelectModule
  ],
  exports: [ListEntityComponent]
})
export class SharedListEntityModule { }
