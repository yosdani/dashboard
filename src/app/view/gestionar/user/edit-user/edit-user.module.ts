import { SpinnerXlModule } from "./../../../../components/widgets/spinner-xl/spinner-xl.module";
import { EditUserComponent } from "./edit-user.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationMessageComponent } from "src/app/components/widgets/confirmation-message/confirmation-message.component";
import { UserService } from "src/app/services/user.service";


@NgModule({
  declarations: [EditUserComponent, ConfirmationMessageComponent],
  imports: [
    CommonModule,
    EditUserRoutingModule,MatDialogModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatRadioModule,
    MatCheckboxModule, MatSelectModule, MatButtonModule,SpinnerXlModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }, UserService],
  entryComponents: [ConfirmationMessageComponent]
})
export class EditUserModule { }
