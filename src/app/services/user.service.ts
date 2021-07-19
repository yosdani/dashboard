import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { hostUrl} from '../variables.globals';

@Injectable({
    providedIn: "root"
})
export class UsersService {
    constructor(private http: HttpClient) {}



    register(user: any) {
        return this.http.post(hostUrl + '/register', user);
    }
    getAll() {
        return this.http.get(hostUrl + '/users', {headers: this.jwt()});
    }
    getAllDataUsers(idUser: number) {
        return this.http.get(hostUrl + '/users/data/' + idUser , {headers: this.jwt()});
    }
    create(user: string, id: number) {
        return this.http.post(hostUrl + '/user/create/' +  id, user, {headers:this.jwt()});
    }
    update(user: string, id: number) {
        return this.http.put(hostUrl + '/user/update/' + id, user, {headers:this.jwt()});
    }
    delete(id: number) {
        return this.http.delete(hostUrl + '/user/delete/' + id, {headers:this.jwt()});
    }
    getIndicadoresByUser(id_user: number) {
        return this.http.get(hostUrl + '/indicadores/' + id_user, {headers: this.jwt()});
    }

    jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser.token) {
            let header = new HttpHeaders({ 'Authorization': 'Bearer ' + currentUser.token });
            header.append('Content-Type', 'application/json');
            return header;
        }
    }

}