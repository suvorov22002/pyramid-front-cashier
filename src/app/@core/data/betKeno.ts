import { Observable } from "rxjs";
import { Bet } from ".";

export interface BetKeno extends Bet {
    coefficient: number;
    multipleRound: number;
}

export abstract class BettingKenoData {
    abstract createKenoBet(keno: BetKeno): Observable<BetKeno>;
    abstract checkKenoBet(barcode: string): Observable<BetKeno>;
    abstract listAllBetPartner(partner: string): Observable<BetKeno[]>;
    abstract listAllBetPartnerRoom(partner: string, room: string): Observable<BetKeno[]>;
}