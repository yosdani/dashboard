import { OperationsService } from '../../../services';
import { Component, NgZone, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import { Rutas } from 'src/app/shared/rutas.enum';
import { Roles } from 'src/app/shared/roles.enum';

@Component({
  selector: 'app-tables',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [routerTransition()]
})
export class UsersComponent implements OnInit {

  x: number;
  term: string = '';
  search: string;
  user_id: number;
  closeResult: string;
  users: any;
  edit_user: any = {};
  nameEmpty: boolean = false;
  addnameEmpty: boolean = false;
  emailEmpty: boolean = false;
  addemailvalid: boolean = false;
  addemailEmpty: boolean = false;
  addpasswordEmpty: boolean = false;
  Empty: boolean = false;
  addEmpty: boolean = false;
  User: any = {};
  Organizations: any = [];
  nombreOrganizations: any = [];
  edit_submitted: boolean = false;
  showUsers: boolean;
  allDataUser: any;
  rol : string;
  user: any;
  id_currentUser : number;
  idOrganization: number;

  constructor(private modalService: NgbModal, private userService: UserService, private zone: NgZone,
    private router: Router, private toastr: ToastrService, private operations: OperationsService,
              iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog) {
    this.showUsers = false;
    this.rol = localStorage.getItem('rol');
    this.user = this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.id_currentUser = this.user.user.id;
    iconRegistry.addSvgIcon('plus', sanitizer.bypassSecurityTrustResourceUrl('assets/images/icon/plus.svg'));
  }

  ngOnInit() {
    this.getAllUsers();
  }

  edit(currentUser) {
    this.edit_user = {};
    this.edit_user.id = currentUser.id;
    this.edit_user.name = currentUser.name;
    this.edit_user.email = currentUser.email;
    this.edit_user.rol = currentUser.rol;
    this.edit_user.id_organization = currentUser.id_organization;
    this.edit_user.password = '';
    this.edit_user.confpassword = '';
  }
  cancelar() {
    this.edit_submitted = false;
  }

  delete(contentdelete, user) {
    this.user_id = user.id;
    this.modalService.open(contentdelete).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${UsersComponent.getDismissReason(reason)}`;
    });
  }

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  showAlert(msg, title) {
    this.toastr.error(msg, title, {
      enableHtml: true,
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    });
  }

  showInfo(msg, title) {
    this.toastr.success(msg, title, {
      enableHtml: true,
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    });
  }

  onSelectionChangeRole(role) {
    if (role == Roles.administrador)
      this.edit_user.rol = Roles.administrador;
    else this.edit_user.rol = Roles.usuario;
  }

  getAllUsers() {
    this.zone.run(() => {
      this.userService.getAll().subscribe(
        (users: any[]) => {
          this.userService.getAllDataUsers(this.id_currentUser).toPromise().then(data => {
            this.idOrganization = Number(data['data']['idorganization']);
            if (this.rol !== Roles.superAdministrador)
            this.users = users.filter(f => f.idorganization === this.idOrganization);
            else this.users = users;
            this.showUsers = this.users.length > 0;
         }).catch(error => {
             if (error.status === 401) {
               localStorage.removeItem('isLoggedin');
               localStorage.removeItem('currentUser');
               this.router.navigate([Rutas.login]);
             } else {
               this.router.navigate([Rutas.error]);
             }
         })
        },
        error => {
          if (error.status === 401) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('currentUser');
            this.router.navigate([Rutas.login]);
          } else {
            this.router.navigate([Rutas.error]);
          }
        }
      );
    });
  }
  validateEdit(): boolean {
    if (this.rol === Roles.administrador || this.rol === Roles.superAdministrador) return true;
    else  return false;
  }

  validateDelete(rol: string): boolean {
    if (this.rol === Roles.superAdministrador && rol !== Roles.superAdministrador) return true;
    if (this.rol === Roles.administrador && rol !== Roles.administrador) return true;
    else return false;
  }

  update(form: NgForm) {
    if (this.update_validator(form)) {
      this.zone.run(() => {
        this.userService.update(this.edit_user, this.edit_user.id).subscribe(
          user => {
            this.modalService.dismissAll(true);
            this.showInfo('El usuario ' + this.edit_user.name + ' ha sido actualizado satisfactoriamente.', 'Usuario actualizado satisfactoriamente');
            this.getAllUsers();
          },
          error => {
            if (error.status === 401) {
              localStorage.removeItem('isLoggedin');
              localStorage.removeItem('currentUser');
              this.router.navigate(['/login']);
            } else {
              this.router.navigate(['/error']);
            }
          }
        );
      });
    }
  }

  create_validator(form) {
    if (!form.valid) {
      if (form.value.name == undefined && form.value.email == undefined && form.value.password == undefined) {
        this.addEmpty = true;
        setTimeout(() => {
          this.addEmpty = false;
        }, 3000);
        return false;
      }
      if (form.value.name == undefined) {
        this.addnameEmpty = true;
        setTimeout(() => {
          this.addnameEmpty = false;
        }, 3000);
        return false;
      }
      if (form.value.email == undefined) {
        this.addemailvalid = true;
        // this.addemailEmpty = true
        setTimeout(() => {
          this.addemailEmpty = false;
        }, 3000);
        return false;
      }
      if (form.value.password == undefined) {
        this.addpasswordEmpty = true;
        setTimeout(() => {
          this.addpasswordEmpty = false;
        }, 3000);
        return false;
      }
    }
    return true;
  }

  update_validator(form) {
    if (this.edit_user.password != this.edit_user.confpassword) {
      // this.alertService.dataBaseConectionError("Las Contrasennas no coinciden");
      return false;
    }
    if (this.edit_user.name == '' && this.edit_user.email == '') {
      this.Empty = true;
      setTimeout(() => {
        this.Empty = false;
      }, 3000);
      return false;
    }
    if (this.edit_user.name == '') {
      this.nameEmpty = true;
      setTimeout(() => {
        this.nameEmpty = false;
      }, 3000);
      return false;
    }
    if (this.edit_user.email == '') {
      this.emailEmpty = true;
      setTimeout(() => {
        this.emailEmpty = false;
      }, 3000);
      return false;
    }
    return true;
  }

  deleteUser() {
    this.zone.run(() => {
      this.userService.delete(this.user_id).subscribe(
        user => {
          this.closeResult = `Dismissed ${UsersComponent.getDismissReason(ModalDismissReasons.ESC)}`;
          this.showInfo('Se ha eliminado el usuario satisfactoriamente', 'Usuario eliminado');
          this.getAllUsers();
        },
        error => {
          if (error.status === 401) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/error']);
          }
        }
      );
    });
  }

  obtenerOrganizaciones(){
    this.zone.run(() => {
      this.operations.getOrganizations().subscribe(
        Organizations => {
          this.Organizations = Organizations;

          this.Organizations.forEach(o => {
            this.nombreOrganizations = o.name;


          });

        }
      )
    })

  }



}
