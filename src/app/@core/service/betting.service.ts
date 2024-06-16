import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Bet } from "../data";

@Injectable({
    providedIn: 'root'
})
export class BettingService  {

    private namespace: String = "api/v1/payments"
    private API_URL: string = environment.apiUrl;
    
    constructor(private httpClient: HttpClient) {}

    listEventOdds(codeGame: string): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.API_URL}/${this.namespace}/events/odds/${codeGame}`);
    }

    checkBet(code:string, barcode: string): Observable<Bet> {
        return this.httpClient.get<Bet>(`${this.API_URL}/${this.namespace}/partner/${code}/barcode/${barcode}`);
    }

}