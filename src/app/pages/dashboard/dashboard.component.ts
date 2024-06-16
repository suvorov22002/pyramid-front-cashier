import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BettingService } from 'app/@core/service/betting.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  firstForm: UntypedFormGroup;
  radioGroupValue: any = 'No';
  AllGames: string[] = ["keno","bingo","spin","dog","soccer"];
  canBetKeno: boolean;
  connected: boolean = true;

  constructor(private fb: UntypedFormBuilder) {}
  
  ngOnInit(): void {
    this.firstForm = this.fb.group({
      amount: [null, [Validators.required]],
      coefficient: ['No'],
    });

    

    localStorage.setItem("login", "JOSELU");
    localStorage.setItem("partner", "PESCPM6DQRG1714386769661");
    localStorage.setItem("salle", "RLHBZCJOX4F1714456962016");
    localStorage.setItem('designation', "RAMATBET");
    localStorage.setItem("misemin", '200');
    localStorage.setItem("misemax", '10000');

  }

  ngAfterViewInit(): void {
    this.canBetKeno = true;
  }

  onSubmitBet() {

  }

  onCancelBet(){

  }

  validateSubmit(){
    return false;
  }

}
