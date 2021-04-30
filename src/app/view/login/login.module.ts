import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {LoginService} from '../../services';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatDialogModule,
        TranslateModule,
        ToastrModule.forRoot(),
        LoginRoutingModule],
    declarations: [LoginComponent],
    providers: []
})
export class LoginModule {}
