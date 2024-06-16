import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Statut } from 'app/@core/data';
import { BetKeno } from 'app/@core/data/betKeno';
import { BettingKenoService } from 'app/@core/data/keno-function/bettingkeno.service';
import { UserData } from 'app/@core/data/users';
import { DialogSlipComponent } from './dialog-slip/dialog-slip.component';
import { NbDialogService } from '@nebular/theme';
import { GlobalService } from 'app/@core/service/global.service';

@Component({
  selector: 'ngx-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {

  firstForm: UntypedFormGroup;
  radioGroupValue: any = 'No';
  amountValue: any;
  amountRegex = /^[1-9]{10}$/;
  invalidAmount: boolean = true;
  canBet: boolean = false;
  isLoading: boolean = false;
  validSelection: boolean = false;
  cashier_balance: number;
  errorMessage: any;
  betKeno: BetKeno;
  miseMin: number;
  miseMax: number;

  @Input('resultMessage')
  resultMessage: any;

  constructor(private fb: UntypedFormBuilder, private userService: UserData, private kenoservice: BettingKenoService,
    private dialogService: NbDialogService, private globalService: GlobalService
  ) {}

  get globalBalance(): number {
    return this.globalService.globalBalance;
  }

  set globalBalance(value: number) {
    this.globalService.globalBalance = value;
  }
  
  ngOnInit(): void {

    this.firstForm = this.fb.group({
      amount: [null, [Validators.required]],
      coefficient: ['No'],
    });

    this.cashier_balance = this.userService.getBalance();
    this.miseMax = +localStorage.getItem("misemax");
    this.miseMin = +localStorage.getItem("misemin");
  
  }

  onSubmitBet() {
      
      this.betKeno = {
        multipleRound: this.resultMessage.multiplicite,
        codeGame: this.resultMessage.game,
        codePartner: localStorage.getItem("partner"),
        salle: localStorage.getItem("salle"),
        cashierLogin: localStorage.getItem("login"),
        numeroTirage: this.resultMessage.event,
        status: Statut.TCKNEVAL,
        montantMise: this.amountValue,
        codePari: this.resultMessage.codePari,
        selection: this.resultMessage.data,
        coefficient: this.radioGroupValue === 'No' ? 0 : 1,
        slips: []
      }
      
      var game = this.resultMessage.game;
      this.isLoading = true;

      switch(game) {

        case 'KENO':
          this.kenoservice.createKenoBet(this.betKeno).subscribe(
            (res: BetKeno) => {
              console.log("return", res)
              this.globalBalance = res.balance;
              this.canBet = false;
              this.isLoading = false;
              this.amountValue = '';
              this.validSelection = false;
              this.printShift(res);
            },
            (error) => {
              console.log("error", error)
              this.isLoading = false
            }
          );

          break;
      }
  }

  onCancelBet(){

  }

  validateSubmit(){
    return this.invalidAmount || !this.canBet;
  }

  onKeyAmountEvent() {

    this.invalidAmount = this.amountRegex.test(this.amountValue);
    console.log(this.invalidAmount)
    if(this.invalidAmount) {
      this.errorMessage = "Montant incorrect";
    }
    else{
      this.errorMessage = '';
    }

  }

  checkAmount(value) {
    console.log("value",value)
  }

  verifAmount() {

    this.invalidAmount = this.amountRegex.test(this.amountValue);

    if(!this.invalidAmount && this.amountValue !== '' && this.amountValue !== undefined
       && this.amountValue <= this.miseMax && this.amountValue >= this.miseMin) {

      this.errorMessage = '';

      if(this.cashier_balance < parseInt(this.amountValue)){

				this.errorMessage = "Credit insuffisant";
        this.canBet = false
				return false;
			}

      this.canBet = true;
      this.betKeno = undefined;
      document.getElementById('printer').focus();
      
    }
    else {

      if(this.amountValue > this.miseMax) {
        this.errorMessage = "Mise maximale atteinte.";
      }
      else if(this.amountValue < this.miseMin) {
        this.errorMessage = "Mise minimale atteinte.";
      }
      
      this.canBet = false;
      return false;
    }

  }

  printShift(res: BetKeno) {
    this.dialogService.open(
      DialogSlipComponent,
      {
        context: {
          data: res
        },
        closeOnBackdropClick: true,
      }).onClose.subscribe(confirm => {
        
      });
  }
}
