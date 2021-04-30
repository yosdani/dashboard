
import { Component } from "@angular/core";
import {UsersService} from "../../services/user.service";
import {Validators, FormGroup, FormBuilder, FormControl} from "@angular/forms";
@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
    email: string;
    password: string;
    confirmPassword: string;
    public registerForm: FormGroup;
    public submitted: Boolean = false;
    public error: {code: number, message: string} = null;
    private emailRegx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;


    constructor(private formBuilder: FormBuilder) {}
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.pattern(this.emailRegx)]],
            password: ["", [Validators.required, Validators.minLength(6)]],
            confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
        });
    }
    // showInfo(msg: string, title: string) {
    //     if(this.fixed == 0 || this.fixed % 2 == 0)
    //         this.toastr.warning(msg, title, {
    //             enableHtml: true,
    //             timeOut: 5000,
    //             closeButton: true,
    //             progressBar: true,
    //             positionClass: "toast-bottom-right",
    //         });
    //     this.fixed ++;
    // }

    register() {
        // const user = { email: this.email, password: this.password };
        // this.userService.register(user).subscribe(data => {
        //    // this.userService.setToken(data.token);
        // });
    }
}
