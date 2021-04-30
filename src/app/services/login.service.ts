import {Injectable} from '@angular/core';
// import { Http, Headers, Response, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';
import { environment} from '../../environments/environment';
import {Subject,Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {

     const header = new HttpHeaders({'Content-Type': 'application/json'});
     const body = JSON.stringify({email: email, password: password});
     return this.http.post(environment.apiUrl + '/authenticate', body, {headers: header});
  }

  getUserEntidad(id : number) {
    return this.http.get(environment.apiUrl + '/entidad/' + id, {headers: this.jwt()});
  }

  jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.token) {
      const header = new HttpHeaders({ 'Authorization': 'Bearer ' + currentUser.token });
      header.append('Content-Type', 'application/json');
      return header;
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
