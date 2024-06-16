import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private _globalBalance: number;

  constructor() {
    this._globalBalance = 0;
  }

  // Getter for the global Balance
  get globalBalance(): number {
    return this._globalBalance;
  }

  // Setter for the global Balance
  set globalBalance(value: number) {
    this._globalBalance = value;
  }
}
