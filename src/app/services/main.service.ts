import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { hostUrl } from '../variables.globals';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }
  getlastUpdate() {
    return this.http.get(hostUrl + '/lastupdate', {headers:this.jwt()});
  }
  // getDashboardData(area:number, year: number, month:number) {
  //   let map_ym = this.mapYearMonth(year,month);
  //     return this.http.get(host_url + '/dashboard/indicators/'+ area + '/' + map_ym.year + '/' + map_ym.month, {headers:this.jwt()});
  // }
  // getAreas() {
  //   return this.http.get(host_url + '/areas', {headers:this.jwt()});
  // }
  // getIndicators(id: number) {
  //   return this.http.get(host_url + '/indicators/settings/' + id, {headers:this.jwt()});
  // }
  // getIndicatorName(id: number) {
  //   return this.http.get(host_url + '/indicators/name/' + id, {headers:this.jwt()});
  // }
  // getIndicatorYears(id: number, year:number, lastyear:number) {
  //   return this.http.get(host_url + '/economics/indicators/' + id + '/' + year + '/' + lastyear, {headers:this.jwt()});
  // }
  mapYearMonth(year: number, month: number){
    let _year = year;
    let _month = month;
    if (month == 0){
        _year = year - 1;
        _month = 12;
    }
    return {month:_month, year: _year}
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
