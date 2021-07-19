import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {SpinnerModule} from '../../../components/widgets/spinner/spinner.module';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
@NgModule({
    imports: [CommonModule, UsersRoutingModule, NgbModule, FormsModule,MatDialogModule,
      ToastrModule, ReactiveFormsModule, Ng2SearchPipeModule, SpinnerModule, MatIconModule],
    declarations: [UsersComponent],
})
export class UsersModule {}
