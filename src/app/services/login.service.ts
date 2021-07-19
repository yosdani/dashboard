import {Injectable} from '@angular/core';
// import { Http, Headers, Response, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';
import { environment} from '../../environments/environment';
import {Subject,Observable} from 'rxjs';
import {Auth, Authentication, SignUp} from '@models';


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

  signUp(payload: SignUp): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', payload.avatar);
    return this.http.post<any>(
        `${environment.apiUrl}/register?
          name=${payload.name}&
          email=${payload.email}&
          password=${payload.password}&
          password_confirmation=${payload.password_confirmation}&
          phone=${payload.phone}&
          `, formData
    );
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
