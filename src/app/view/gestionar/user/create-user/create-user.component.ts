import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatOption } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationsService } from 'src/app/services/operations.service';
import { UserService } from 'src/app/services/user.service';
import { Roles } from 'src/app/shared/roles.enum';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  @ViewChild("allSelectedPersp", { static: false })
  private allSelectedPersp: MatOption;
  @ViewChild("allSelectedSubPersp", { static: false })
  private allSelectedSubPersp: MatOption;
  @ViewChild("allSelectedInd", { static: false })
  private allSelectedInd: MatOption;
  organizations: any;
  user: any;
  id_currentUser: number;
  rol: string;
  user_data: any = {};
  perspectivas: any;
  isSelectPers: boolean;
  isSelectSubPers: boolean;
  subPerspectivas: any;
  indicadores: any;
  idEntidad: number;
  dataAuxSubPers: any;
  isSelectInd: boolean;
  dataAuxIndicadores: any;
  dataUser: any;
  id_rol: number;
  idOrganization: number;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private zone: NgZone,
    private router: Router,
    private operations: OperationsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.idEntidad = Number(localStorage.getItem("idEntidadSelect"));
    this.id_currentUser = this.user.user.id;
    this.rol = localStorage.getItem("rol");
    this.perspectivas = [];
    this.isSelectPers = false;
    this.subPerspectivas = [];
    this.indicadores = [];
    this.isSelectSubPers = false;
    this.isSelectInd = false;
     }

  ngOnInit(): void {
    this.obtenerOrganizaciones();
    this.getPerspectivas_Sub_Ind();
  }

  loginForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(5)]],
    confpassword: ["", [Validators.required, Validators.minLength(5)]],
    organization: ["", Validators.required],
    rol: ["", Validators.required],
    perspectiva: ["", Validators.required],
    subperspectiva: [""],
    indicadores: [""],
  });

  getPerspectivas_Sub_Ind(): void {
    this.zone.run(() => {
      if (this.rol === Roles.superAdministrador) {
      this.userService.getPerspectivas().subscribe(
        (data) => {
          this.perspectivas = data;
        },
        (error) => {
          if (error.status === 401) {
            localStorage.removeItem("isLoggedin");
            localStorage.removeItem("currentUser");
            this.router.navigate(["/login"]);
          } else {
            this.router.navigate(["/error"]);
          }
        }
      );

      this.userService.getSubPerspectivas().subscribe(
        (data) => {
          this.subPerspectivas = data;
          this.dataAuxSubPers = this.subPerspectivas;
        },
        (error) => {
          if (error.status === 401) {
            localStorage.removeItem("isLoggedin");
            localStorage.removeItem("currentUser");
            this.router.navigate(["/login"]);
          } else {
            this.router.navigate(["/error"]);
          }
        }
      );

      this.userService.getIndicadores().subscribe(
        (data) => {
          this.indicadores = data;
          this.dataAuxIndicadores = this.indicadores;
        },
        (error) => {
          if (error.status === 401) {
            localStorage.removeItem("isLoggedin");
            localStorage.removeItem("currentUser");
            this.router.navigate(["/login"]);
          } else {
            this.router.navigate(["/error"]);
          }
        });
      } else if (this.rol === Roles.administrador) {
        this.userService.getAllDataUsers(this.id_currentUser).subscribe((data) => {
          this.dataUser = data;
          this.perspectivas = data['perspectiva'];
          this.subPerspectivas = data['sub_perspectiva'];
          this.dataAuxSubPers = this.subPerspectivas;
          this.indicadores = data['indicador'];
          this.dataAuxIndicadores = this.indicadores;
          this.idOrganization = Number(data['data']['idorganization']);
          this.loginForm.controls.organization.setValue(this.idOrganization);
      }, error => {
        if (error.status === 401) {
          localStorage.removeItem("isLoggedin");
          localStorage.removeItem("currentUser");
          this.router.navigate(["/login"]);
        } else {
          this.router.navigate(["/error"]);
        }
      });
      }
    });
  }
  //Al seleccionar una perspectiva mostras las Subperspectivas e indicadores correspondientes
  getSubPers_Ind(): void {
    let auxDataSub: any = [];
    let auxDataInd: any = [];
    let sizeSubPersp: number;
    let sizeInd: number;
    if (this.allSelectedPersp.selected) this.allSelectedPersp.deselect();
    if (this.loginForm.controls.perspectiva.value.length == this.perspectivas.length)
      this.allSelectedPersp.select();
    this.isSelectPers = this.loginForm.controls.perspectiva.value.length > 0;
    if (this.isSelectPers) {
      this.loginForm.controls.perspectiva.value.map(p => {
        this.dataAuxSubPers.map(f => {
          if (p == f["id_perspectiva"])
            auxDataSub.push({
              descripcion: f["descripcion"],
              id_sub_perspectiva: f["id_sub_perspectiva"],
              id_perspectiva: f["id_perspectiva"],
            });
        });
        this.dataAuxIndicadores.map(f => {
          if (p == f["id_perspectiva"])
            auxDataInd.push({
              descripcion: f["descripcion"],
              id_indicadores: f["id_indicadores"],
              id_perspectiva: f["id_perspectiva"],
            });
        });
      });
      this.subPerspectivas = auxDataSub.length > 0 ? auxDataSub : null;      
      this.indicadores = auxDataInd.length > 0 ? auxDataInd : null;
      this.isSelectSubPers = this.subPerspectivas && this.subPerspectivas.length > 0;
      this.isSelectInd = this.indicadores && this.indicadores.length > 0;
    } else {
      this.loginForm.controls.perspectiva.setValue([]);
      this.loginForm.controls.indicadores.setValue([]);
      this.loginForm.controls.subperspectiva.setValue([]);
    }
  }

  obtenerOrganizaciones() {
    this.zone.run(() => {
      this.operations.getOrganizations().subscribe(
        (organizations) => {
          this.organizations = organizations;
        },
        (error) => {
          if (error.status === 401) {
            localStorage.removeItem("isLoggedin");
            localStorage.removeItem("currentUser");
            this.router.navigate(["/login"]);
          } else {
            this.router.navigate(["/error"]);
          }
        }
      );
    });
  }

  togglePerOneSubPersp(): void {
    if (this.allSelectedSubPersp.selected) {
      this.allSelectedSubPersp.deselect();
    } else if (this.loginForm.controls.subperspectiva.value.length == this.subPerspectivas.length)
      this.allSelectedSubPersp.select();
  }

  togglePerOneInd(): void {
    if (this.allSelectedInd.selected) {
      this.allSelectedInd.deselect();
    } else if (
      this.loginForm.controls.indicadores.value.length ==
      this.indicadores.length
    )
      this.allSelectedInd.select();
  }

  toggleAllSelectSubPersp(): void {
    if (this.allSelectedSubPersp.selected) {
      this.loginForm.controls.subperspectiva.patchValue([
        -1, ...this.subPerspectivas.map((item) => item.id_sub_perspectiva)]);
    } else {
      this.loginForm.controls.subperspectiva.patchValue([]);
    }
  }

  toggleAllSelectInd(): void {
    if (this.allSelectedInd.selected) {
      this.loginForm.controls.indicadores.patchValue([
        -1,...this.indicadores.map((item) => item.id_indicadores)]);
    } else {
      this.loginForm.controls.indicadores.patchValue([]);
    }
  }

  toggleAllSelectPersp(): void {
    if (this.allSelectedPersp.selected) {
      this.loginForm.controls.perspectiva.patchValue([
        -1,...this.perspectivas.map((item) => item.id_perspectiva)]);
        this.getSubPers_Ind();
    } else {
      this.loginForm.controls.perspectiva.patchValue([]);
      this.getSubPers_Ind();
    }
  }

  create(id: number) {
    let perspSelect = this.loginForm.controls.perspectiva.value;
    let subPerspSelect = this.loginForm.controls.subperspectiva.value;
    let indSelect = this.loginForm.controls.indicadores.value;
    if (
      this.loginForm.get("confpassword").value ===
      this.loginForm.get("password").value
    ) {
      let data: any = {
        perspectivas: [],
        subperspectivas: [],
        indicadores: [],
      };
      this.user_data.name = this.loginForm.get("name").value;
      this.user_data.email = this.loginForm.get("email").value;
      this.user_data.organization = this.loginForm.get("organization").value;
      this.user_data.password = this.loginForm.get("password").value;
      this.user_data.rol = this.loginForm.get("rol").value;
      let auxSub = [];
      let auxInd = [];
      //Insertar las subPerspectivas e Indicadores que coincidan con los seleccionados
      this.removeItemFromArr(perspSelect, -1);
      this.removeItemFromArr(subPerspSelect, -1);
      this.removeItemFromArr(indSelect, -1);
      perspSelect.map((p) => {
        data["perspectivas"].push(p);
        this.subPerspectivas ? this.subPerspectivas.map((s) => {
          if (p === s["id_perspectiva"]) {
            subPerspSelect ? subPerspSelect.map((ss) => {
                if (s["id_sub_perspectiva"] === ss) {
                  auxSub.push(s["id_sub_perspectiva"]);
                }
              }): auxSub = [];
          }
        }): data["subperspectivas"] = null;

        if (this.subPerspectivas) {
          data["subperspectivas"].push(auxSub);
          auxSub = [];
        }

        this.indicadores ? this.indicadores.map((i) => {
          if (p === i["id_perspectiva"]) {
            indSelect ? indSelect.map((is) => {
                if (i["id_indicadores"] === is) {
                  auxInd.push(i["id_indicadores"]);
                }
              }): auxInd = [];
          }
        }): data["indicadores"] = null;
          if (this.indicadores) {
          data["indicadores"].push(auxInd);
          auxInd = [];
          }
      });
      this.user_data.perspectiva = data["perspectivas"];
      this.user_data.subperspectiva = data["subperspectivas"];
      this.user_data.indicadores = data["indicadores"];
      this.zone.run(() => {
        //Creando el usuario
          this.userService.create(this.user_data, id).subscribe(
            () => {
              this.showInfo("Usuario creado correctamente", "Información");
              this.router.navigate(["/user"]);
            },
            (error) => {
              if (error.status === 500) {
                this.showAlert("El correo electronico ya existe!", "Error");
              } else if (error.status === 401) {
                localStorage.removeItem("isLoggedin");
                localStorage.removeItem("currentUser");
                this.router.navigate(["/login"]);
              } else {
                this.router.navigate(["/error"]);
              }
            }
          );
      });
    } else this.showAlert("Las contraseñas no coinciden", "Error");
  }

  showInfo(msg, title) {
    this.toastr.success(msg, title, {
      enableHtml: true,
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      positionClass: "toast-bottom-right",
    });
  }

  showAlert(msg, title) {
    this.toastr.error(msg, title, {
      enableHtml: true,
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      positionClass: "toast-bottom-right",
    });
  }

  removeItemFromArr ( arr: number[], item: number ): void {
      const i = arr ? arr.indexOf( item ): -1; 
      if ( i !== -1 )
        arr.splice( i, 1 );
  }

}
