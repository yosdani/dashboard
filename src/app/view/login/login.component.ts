// login.component.ts

import { Component,OnInit,NgZone } from "@angular/core";
import {LoginService} from "../../services/login.service";
import {Validators, FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";



@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
    email: string;
    password: string;
    fixed : number = 0;
    radoncatcha: any = "";
    catchanumber: number;
    catchadata: boolean = false;
    checked: boolean = true;
    chekedcatcha: boolean = false;

    public loginForm: FormGroup;
    public submitted: Boolean = false;
    public error: {code: number, message: string} = null;

    private emailRegx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    constructor(private formBuilder: FormBuilder,
                public router: Router,
                private loginService: LoginService,
                private zone: NgZone,
                private toastr: ToastrService


    ) {}
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.pattern(this.emailRegx)]],
            password: ["", Validators.required],
            catchanumber: ["", Validators.required],
            catchadata: ["", Validators.required],
        });
    }
    catcha() {
        if (this.checked === true) {
            let catcha = Math.floor(Math.random() * Math.floor(9999));
            if (Number.isInteger(catcha)) {
                this.radoncatcha = catcha;
                this.chekedcatcha = false;
                setTimeout(() => {
                    this.radoncatcha = "";
                    this.checked = true;
                    this.loginForm.get("catchadata").setValue(false);
                }, 15000);
            }
        } else {
            this.checked = false;
            this.radoncatcha = "";
        }
    }

    getErrorMessage(field: string): string {
        if (this.loginForm.get(field).hasError('required')) {
            return 'Campo requerido';
        }
    }

    showInfo(msg: string, title: string) {
        if(this.fixed == 0 || this.fixed % 2 == 0)
            this.toastr.warning(msg, title, {
                enableHtml: true,
                timeOut: 5000,
                closeButton: true,
                progressBar: true,
                positionClass: "toast-bottom-right",
            });
        this.fixed ++;
    }

    login() {
        if (this.loginForm.get('catchadata').value && this.radoncatcha === this.loginForm.get("catchanumber").value) {

            this.zone.run(() => {
                this.loginService.login(this.loginForm.get('email').value,
                    this.loginForm.get('password').value)
                    .subscribe(data => {
                            if (data) {
                                console.log(data);

                                localStorage.setItem("user", data["user"]["name"]);
                                localStorage.setItem('iduser', data['user']['id']);
                                localStorage.setItem("isLoggedin", "true");
                                localStorage.setItem("currentUser", JSON.stringify(data));
                                //this.router.navigate(["/"]);
                            }
                        },
                        error => {
                            if (error.status === 401) {
                                this.loginForm.get("catchanumber").setValue(null);
                                this.checked = true;
                                this.radoncatcha = false;
                                this.loginForm.get("catchadata").setValue(false);
                                this.showInfo(
                                    "Por favor vuelva a intentarlo o consulte a un administrador",
                                    "Credenciales Incorrectas"
                                );
                            } else {
                                this.router.navigate(["/error", error.status]);
                            }
                        }
                    );

            });
        }
        else {
            this.loginForm.get("catchanumber").setValue(null);
            this.checked = true;
            this.radoncatcha = false;
            this.loginForm.get("catchadata").setValue(false);
            this.showInfo(
                "Su verificación ha sido incorrecta",
                "Verificación Incorrecta"
            );
        }
    }
}
