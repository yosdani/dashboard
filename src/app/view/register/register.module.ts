import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import {LoginService} from '../../services';
import { ToastrModule } from 'ngx-toastr';
import {Ng2TelInputModule} from 'ng2-tel-input';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatDialogModule,
        TranslateModule,
        Ng2TelInputModule,
        ToastrModule.forRoot(),
        RegisterRoutingModule],
    declarations: [RegisterComponent],
    providers: [LoginService]
})
export class RegisterModule {}
