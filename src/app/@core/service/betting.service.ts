import { Injectable } from "@angular/core";
import { BetKeno, BettingKenoData } from "../data/betKeno";
import { of as observableOf, Observable } from "rxjs";
import { betKeno_A, betKeno_G, betKeno_N, betKeno_P } from "../mock/betkeno-data";


@Injectable({
    providedIn: 'root'
})
export class BettingService extends BettingKenoData {
    
    private allMockBets: BetKeno[] = [];

    constructor() {
        super();
        this.allMockBets.push(betKeno_G);
        this.allMockBets.push(betKeno_P);
        this.allMockBets.push(betKeno_N);
        this.allMockBets.push(betKeno_A);
    }
    
    createKenoBet(keno: BetKeno): Observable<BetKeno> {
        throw new Error("Method not implemented.");
    }

    checkKenoBet(barcode: string): Observable<BetKeno> {
        var data = this.allMockBets.find(b => b.barcode === barcode);
        return observableOf(data);
    }

    listAllBetPartner(partner: string): Observable<BetKeno[]> {
        throw new Error("Method not implemented.");
    }

    listAllBetPartnerRoom(partner: string, room: string): Observable<BetKeno[]> {
        throw new Error("Method not implemented.");
    }

}