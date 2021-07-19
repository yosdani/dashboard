import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { hostUrl} from "../variables.globals";

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor(private http: HttpClient) { }

  getPersSubInd(id_user: number) {
    return this.http.get(hostUrl + '/persp/' + id_user, {headers: this.jwt()});
  }

  jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.token) {
      const header = new HttpHeaders({'Authorization': 'Bearer ' + currentUser.token});
      header.append('Content-Type', 'application/json');
      return header;
    }
  }
}
