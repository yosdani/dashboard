
import { Component } from "@angular/core";
import {UsersService} from "../../services/user.service";
import {Validators, FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {CountryISO, PhoneNumberFormat, SearchCountryField} from 'ngx-intl-tel-input';
import {DefaultImage} from '@enums';
import {AppBaseComponent } from '@baseComponent';
import { PhoneNumberUtil } from 'google-libphonenumber';

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
    email: string;
    password: string;
    confirmPassword: string;
    phone:string;
    public registerForm: FormGroup;
    public submitted: Boolean = false;
    public error: {code: number, message: string} = null;
    private emailRegx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    PhoneNumberFormat = PhoneNumberFormat;
    separateDialCode = true;
    SearchCountryField = SearchCountryField;
    CountryISO = CountryISO;
    preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

    constructor(private formBuilder: FormBuilder) {
        const phone: PhoneNumberUtil = PhoneNumberUtil.getInstance();
    }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.pattern(this.emailRegx)]],
            password: ["", [Validators.required, Validators.minLength(6)]],
            confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
            phone:["", [Validators.required]],

        });
    }


    register() {

    }
}
