import { CreateUserComponent } from "./create-user.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserRoutingModule } from './create-user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SpinnerModule } from 'src/app/components/widgets/spinner/spinner.module';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationMessageComponent } from "src/app/components/widgets/confirmation-message/confirmation-message.component";
import { UserService } from "src/app/services/user.service";


@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule, MatDialogModule, MatFormFieldModule,
    CreateUserRoutingModule, FormsModule, ReactiveFormsModule, MatRadioModule,
    MatCheckboxModule, MatSelectModule, SpinnerModule, MatButtonModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }, UserService]
})
export class CreateUserModule { }
