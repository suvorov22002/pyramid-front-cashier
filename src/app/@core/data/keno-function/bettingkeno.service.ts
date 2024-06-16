import { Injectable } from "@angular/core";
import { of as observableOf, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "environments/environment";
import { BetKeno, BettingKenoData } from "../betKeno";


@Injectable({
    providedIn: 'root'
})
export class BettingKenoService extends BettingKenoData {

    private namespace: String = "api/v1/bets"
    private API_URL: string = environment.apiUrl;

    private allMockBets: BetKeno[] = [];

    constructor(private httpClient: HttpClient) {
        super();
    }

    createKenoBet(keno: BetKeno): Observable<BetKeno> {
        return this.httpClient.post<BetKeno>(`${this.API_URL}/${this.namespace}/betkeno`, keno, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
    }

    listAllBetPartner(partner: string): Observable<BetKeno[]> {
        throw new Error("Method not implemented.");
    }

    listAllBetPartnerRoom(partner: string, room: string): Observable<BetKeno[]> {
        throw new Error("Method not implemented.");
    }

}