import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Shift } from '../data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  private namespace: String = "api/v1/shifts"
  private _namespace: String = "api/v1/users"
  private API_URL: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  openShift(shift: any): Observable<Shift> {
    return this.httpClient.post<Shift>(`${this.API_URL}/${this.namespace}`, shift, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  selectShift(shift: any): Observable<Shift> {
    return this.httpClient.post<Shift>(`${this.API_URL}/${this.namespace}/open`, shift, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  retrieveCashierInfo(partnerCode: string, login: string): Observable<any> {
    return this.httpClient.get<any[]>(`${this.API_URL}/${this._namespace}/partner/${partnerCode}/${login}`);
  }

  summarizeShift(shift: any): Observable<Shift> {
    return this.httpClient.post<Shift>(`${this.API_URL}/${this.namespace}/summarize`, shift, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  closeShift(shift: any): Observable<Shift> {
    return this.httpClient.put<Shift>(`${this.API_URL}/${this.namespace}`, shift, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
}
