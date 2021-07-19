import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatOption } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationMessageComponent } from 'src/app/components/widgets/confirmation-message/confirmation-message.component';
import { OperationsService } from 'src/app/services/operations.service';
import { UserService } from 'src/app/services/user.service';
import { Roles } from 'src/app/shared/roles.enum';
import { Rutas } from 'src/app/shared/rutas.enum';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
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
  id_user: number;
  show_user: boolean;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private zone: NgZone,
    private router: Router,
    private operations: OperationsService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _ac: ActivatedRoute) {
    this.show_user = false;
    this.id_user = Number( _ac.snapshot.paramMap.get('id'));
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.idEntidad = Number(localStorage.getItem("idEntidadSelect"));
    this.id_currentUser = this.user.user.id;
    this.rol = localStorage.getItem("rol");
    this.perspectivas = [];
    this.isSelectPers = false;
    this.subPerspectivas = [];
    this.isSelectSubPers = false;
    this.isSelectInd = false;
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

  ngOnInit(): void {
    this.obtenerOrganizaciones();
    this.getPerspectivas_Sub_Ind();
    this.getDataUser();

  }
  obtenerOrganizaciones() {
    this.zone.run(() => {
      this.operations.getOrganizations().toPromise().then((organizations) => this.organizations = organizations)
      .catch(error => {
        if (error.status === 401) {
          localStorage.removeItem("isLoggedin");
          localStorage.removeItem("currentUser");
          this.router.navigate([Rutas.login]);
        } else {
          this.router.navigate([Rutas.error]);
        }
      });
    });
  }

  getPerspectivas_Sub_Ind(): void {
    this.zone.run(() => {
      if (this.rol === Roles.superAdministrador) {
      this.userService.getPerspectivas().toPromise().then((data) => {
        this.perspectivas = data;
      }).catch((error) => {
          if (error.status === 401) {
            localStorage.removeItem("isLoggedin");
            localStorage.removeItem("currentUser");
            this.router.navigate(["/login"]);
          } else {
            this.router.navigate(["/error"]);
          }
        });

      this.userService.getSubPerspectivas().toPromise().then((data) => {
        this.subPerspectivas = data;
        this.dataAuxSubPers = this.subPerspectivas;
      }).catch((error) => {
          if (error.status === 401) {
            localStorage.removeItem("isLoggedin");
            localStorage.removeItem("currentUser");
            this.router.navigate(["/login"]);
          } else {
            this.router.navigate(["/error"]);
          }
        });

      this.userService.getIndicadores().toPromise().then(
        (data) => {
          this.indicadores = data;
          this.dataAuxIndicadores = this.indicadores;
        }).catch((error) => {
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

   getDataUser() {
    let Persp = [];
      let Sub = [];
      let Ind = [];
      if (this.rol === Roles.superAdministrador) {
        //Obtener los datos del usuario editado
        this.userService.getAllDataUsers(this.id_user).toPromise().then(data => {
          this.dataUser = data;
          this.loginForm.get("name").setValue(this.dataUser["data"]["name"]);
          this.loginForm.get("email").setValue(this.dataUser["data"]["email"]);
          this.loginForm.get("organization").setValue(this.dataUser["data"]["idorganization"]);
          this.id_rol = data["data"]["rol"];
          this.loginForm.controls.rol.setValue(this.id_rol);
          this.dataUser['perspectiva'].map(p => Persp.push(p.id_perspectiva));

            Persp.map(p => {
              this.subPerspectivas.map(sp => {
                 if (p === sp['id_perspectiva'])
                 Sub.push({
                  descripcion: sp["descripcion"],
                  id_sub_perspectiva: sp["id_sub_perspectiva"],
                  id_perspectiva: sp["id_perspectiva"],
                });
              });
              this.indicadores.map(ind => {
                if (p === ind['id_perspectiva'])
                Ind.push({
                  descripcion: ind["descripcion"],
                  id_indicadores: ind["id_indicadores"],
                  id_perspectiva: ind["id_perspectiva"],
                });
              });
            });

            this.subPerspectivas = Sub.length > 0 ? Sub : null;
            this.indicadores = Ind.length > 0 ? Ind : null;

            if (Persp.length > 0 && Persp.length === this.perspectivas.length)
            this.loginForm.controls.perspectiva.patchValue([-1,...Persp.map(item => item)]);
            else if (Persp.length > 0 && Persp.length < this.perspectivas.length)
            this.loginForm.controls.perspectiva.patchValue([...Persp.map(item => item)]);
             else if (Persp.length === 0)
             this.loginForm.controls.perspectiva.patchValue(null);

            if (this.dataUser['sub_perspectiva'].length > 0 
            && this.dataUser['sub_perspectiva'].length === this.subPerspectivas.length)
            this.loginForm.controls.subperspectiva
            .patchValue([-1,...this.dataUser['sub_perspectiva'].map(item => item.id_sub_perspectiva)]);
            else if (this.dataUser['sub_perspectiva'].length > 0 
            && this.dataUser['sub_perspectiva'].length < this.subPerspectivas.length)
            this.loginForm.controls.subperspectiva
            .patchValue([...this.dataUser['sub_perspectiva'].map(item => item.id_sub_perspectiva)]);
            else if (this.dataUser['sub_perspectiva'].length === 0)
            this.loginForm.controls.subperspectiva.patchValue(null);

            console.log(this.dataUser['indicador'], this.indicadores)
            if (this.dataUser['indicador'].length > 0 && this.dataUser['indicador'].length === this.indicadores.length)
            this.loginForm.controls.indicadores
            .patchValue([-1, ...this.dataUser['indicador'].map(item => item.id_indicadores)]);
            else if (this.dataUser['indicador'].length > 0 && this.dataUser['indicador'].length < this.indicadores.length)
            this.loginForm.controls.indicadores
            .patchValue([...this.dataUser['indicador'].map(item => item.id_indicadores)]);
            else if (this.dataUser['indicador'].length === 0)
            this.loginForm.controls.indicadores.patchValue(null); 
  
          this.isSelectPers = Persp.length > 0;
          this.isSelectSubPers = this.dataUser['sub_perspectiva'].length > 0;
          this.isSelectInd = this.dataUser['indicador'].length > 0;
          this.show_user = true;
        }).catch(error => {
          if (error.status === 401) {
            localStorage.removeItem("isLoggedin");
            localStorage.removeItem("currentUser");
            this.router.navigate([Rutas.login]);
          } else {
            this.router.navigate([Rutas.error]);
          }
        });
      }
      else {
      //Obtener los datos del admin q esta editando el usuario
     this.userService.getAllDataUsers(this.id_currentUser).toPromise().then(data => {
      this.perspectivas = data['perspectiva'];
      this.subPerspectivas = data['sub_perspectiva'];
      this.indicadores = data['indicador'];
      }).catch(error => {
        if (error.status === 401) {
          localStorage.removeItem("isLoggedin");
          localStorage.removeItem("currentUser");
          this.router.navigate([Rutas.login]);
        } else {
          this.router.navigate([Rutas.error]);
        }
      });
        //Obtener los datos del usuario editado
        this.userService.getAllDataUsers(this.id_user).toPromise().then(data => {
        this.dataUser = data;
        this.dataAuxSubPers = this.subPerspectivas;
        this.dataAuxIndicadores = this.indicadores;
        this.loginForm.get("name").setValue(this.dataUser["data"]["name"]);
        this.loginForm.get("email").setValue(this.dataUser["data"]["email"]);
        this.loginForm.get("organization").setValue(this.dataUser["data"]["idorganization"]);
        this.id_rol = data["data"]["rol"];
        this.loginForm.controls.rol.setValue(this.id_rol);       

        this.dataUser['perspectiva'].map(p => Persp.push(p.id_perspectiva));

            Persp.map(p => {
              this.subPerspectivas.map(sp => {
                 if (p === sp['id_perspectiva'])
                 Sub.push({
                  descripcion: sp["descripcion"],
                  id_sub_perspectiva: sp["id_sub_perspectiva"],
                  id_perspectiva: sp["id_perspectiva"],
                });
              });
              this.indicadores.map(ind => {
                if (p === ind['id_perspectiva'])
                Ind.push({
                  descripcion: ind["descripcion"],
                  id_indicadores: ind["id_indicadores"],
                  id_perspectiva: ind["id_perspectiva"],
                });
              });
            });

            this.subPerspectivas = Sub.length > 0 ? Sub : null;
            this.indicadores = Ind.length > 0 ? Ind : null;

            if (Persp.length > 0 && Persp.length === this.perspectivas.length)
            this.loginForm.controls.perspectiva.patchValue([-1,...Persp.map(item => item)]);
            else if (Persp.length > 0 && Persp.length < this.perspectivas.length)
            this.loginForm.controls.perspectiva.patchValue([...Persp.map(item => item)]);
             else if (Persp.length === 0)
             this.loginForm.controls.perspectiva.patchValue(null);

            if (this.dataUser['sub_perspectiva'].length > 0 
            && this.dataUser['sub_perspectiva'].length === this.subPerspectivas.length)
            this.loginForm.controls.subperspectiva
            .patchValue([-1,...this.dataUser['sub_perspectiva'].map(item => item.id_sub_perspectiva)]);
            else if (this.dataUser['sub_perspectiva'].length > 0 
            && this.dataUser['sub_perspectiva'].length < this.subPerspectivas.length)
            this.loginForm.controls.subperspectiva
            .patchValue([...this.dataUser['sub_perspectiva'].map(item => item.id_sub_perspectiva)]);
            else if (this.dataUser['sub_perspectiva'].length === 0)
            this.loginForm.controls.subperspectiva.patchValue(null);

            if (this.dataUser['indicador'].length > 0 && this.dataUser['indicador'].length === this.indicadores.length)
            this.loginForm.controls.indicadores
            .patchValue([-1, ...this.dataUser['indicador'].map(item => item.id_indicadores)]);
            else if (this.dataUser['indicador'].length > 0 && this.dataUser['indicador'].length < this.indicadores.length)
            this.loginForm.controls.indicadores
            .patchValue([...this.dataUser['indicador'].map(item => item.id_indicadores)]);
            else if (this.dataUser['indicador'].length === 0)
            this.loginForm.controls.indicadores.patchValue(null); 

        this.isSelectPers = Persp.length > 0;
        this.isSelectSubPers = Sub.length > 0;
        this.isSelectInd = Ind.length > 0;
        this.show_user = true;
      }).catch(error => {
        if (error.status === 401) {
          localStorage.removeItem("isLoggedin");
          localStorage.removeItem("currentUser");
          this.router.navigate([Rutas.login]);
        } else {
          this.router.navigate([Rutas.error]);
        }
      });
    }
  }

  getSubPers_Ind(): void {
    let auxDataSub: any = [];
    let auxDataInd: any = [];
    let sizeSubPersp: number;
    let sizeInd: number;
    //Obtener las subPerspectivas para cada indicador seleccionado
    if (this.allSelectedPersp.selected)
    this.allSelectedPersp.deselect();
    if (this.loginForm.controls.perspectiva.value.length === this.perspectivas.length)
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
      });
      this.subPerspectivas = auxDataSub.length > 0 ? auxDataSub : null;
      this.isSelectSubPers = this.subPerspectivas && this.subPerspectivas.length > 0;
      if (!this.isSelectSubPers) this.loginForm.controls.subperspectiva.patchValue(null);
      else if (this.loginForm.controls.subperspectiva.value){
        if (this.loginForm.controls.subperspectiva.value[0] === -1) 
        sizeSubPersp = this.loginForm.controls.subperspectiva.value.length - 1;
         else sizeSubPersp = this.loginForm.controls.subperspectiva.value.length;
        if (this.subPerspectivas.length > sizeSubPersp)
         this.allSelectedSubPersp.deselect();
      }

      //Obtener los indicadores para cada perspectiva seleccionada
      this.loginForm.controls.perspectiva.value.map((p) => {
        this.dataAuxIndicadores.map((f) => {
          if (p == f["id_perspectiva"])
            auxDataInd.push({
              descripcion: f["descripcion"],
              id_indicadores: f["id_indicador"],
              id_perspectiva: f["id_perspectiva"],
            });
        });
      });
      
      this.indicadores = auxDataInd.length > 0 ? auxDataInd : null;
      this.isSelectInd = this.indicadores && this.indicadores.length > 0;
      
      if (!this.isSelectInd) this.loginForm.controls.indicadores.patchValue(null);
      else if (this.loginForm.controls.indicadores.value){         
        if (this.loginForm.controls.indicadores.value[0] === -1) 
        sizeInd = this.loginForm.controls.indicadores.value.length - 1;
        else sizeInd = this.loginForm.controls.indicadores.value.length;
        if (this.indicadores.length > sizeInd)
         this.allSelectedInd.deselect();
      }
    } else {
      this.loginForm.controls.perspectiva.setValue([]);
      this.loginForm.controls.indicadores.setValue([]);
      this.loginForm.controls.subperspectiva.setValue([]);
    }
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
    } else if (this.loginForm.controls.indicadores.value.length == this.indicadores.length)
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
      this.loginForm.controls.indicadores.patchValue([-1,...this.indicadores.map((item) => item.id_indicadores)]);
    } else {
      this.loginForm.controls.indicadores.patchValue([]);
    }
  }

  toggleAllSelectPersp(): void {
    const sizePersp = this.perspectivas.length;
    let sizeSubPersp: number;
    let sizeInd: number;
    if (this.loginForm.controls.perspectiva.value)
    sizeSubPersp = this.loginForm.controls.perspectiva.value[0] === -1 
          ? this.loginForm.controls.perspectiva.value.length - 1 : this.loginForm.controls.perspectiva.value.length;
     else sizeSubPersp = 0;
    if (this.loginForm.controls.indicadores.value)
    sizeInd = this.loginForm.controls.indicadores.value[0] === -1 
                    ? this.loginForm.controls.indicadores.value.length - 1 : this.loginForm.controls.indicadores.value.length;
    else sizeInd = 0;
    let i = 0;
    if (this.allSelectedPersp.selected) {
      this.loginForm.controls.perspectiva.patchValue([-1,...this.perspectivas.map((item) => item.id_perspectiva)]);
      for (let j = this.dataAuxSubPers.length - 1; j >= 0; j--) {
        while (
          this.perspectivas.length > i &&
          this.perspectivas[i]["id_perspectiva"] !=
            this.dataAuxSubPers[j]["id_perspectiva"]
        )
          i++;
        if (i === sizePersp) this.dataAuxSubPers.splice(j, 1);
        i = 0;
      }
      for (let j = this.dataAuxIndicadores.length - 1; j >= 0; j--) {
        while (
          this.perspectivas.length > i &&
          this.perspectivas[i]["id_perspectiva"] !=
            this.dataAuxIndicadores[j]["id_perspectiva"]
        )
          i++;
        if (i === sizePersp) this.dataAuxIndicadores.splice(j, 1);
        i = 0;
      }
      this.subPerspectivas = this.dataAuxSubPers;
      this.indicadores = this.dataAuxIndicadores;
      this.isSelectSubPers = true;
      this.isSelectInd = true;
      this.isSelectPers = true;
      if (this.subPerspectivas.length > sizeSubPersp) this.allSelectedSubPersp.deselect();
      if (this.indicadores.length > sizeInd) this.allSelectedInd.deselect();
    } else {
      this.loginForm.controls.perspectiva.patchValue(null);
      this.loginForm.controls.subperspectiva.patchValue(null);
      this.loginForm.controls.indicadores.patchValue(null);
      this.isSelectSubPers = false;
      this.isSelectInd = false;
    }
  }

  update(id: number) {
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
          //Editando el usuario
          this.userService.update(this.user_data, this.id_user).subscribe(
            () => {
              if (this.user["user"]["id"] === this.id_user) {
                const dialogRef = this.dialog.open(
                  ConfirmationMessageComponent,
                  {
                    data:
                      "Para observar los cambios debe cerrar la sesión, ¿Desea cerrar la sesión?",
                    width: "22%",
                    height: "auto",
                    disableClose: true,
                  }
                );
                dialogRef.afterClosed().subscribe((result) => {
                  if (result) this.router.navigate(["/login"]);
                  else {
                    this.showInfo(
                      "El usuario a sido actualizado",
                      "Información"
                    );
                    this.router.navigate(["/user"]);
                  }
                });
              } else {
                this.showInfo("El usuario a sido actualizado", "Información");
                this.router.navigate(["/user"]);
              }
            },
            (error) => {
              if (error.status === 401) {
                localStorage.removeItem("isLoggedin");
                localStorage.removeItem("currentUser");
                this.router.navigate([Rutas.login]);
              } else {
                this.router.navigate([Rutas.error]);
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
