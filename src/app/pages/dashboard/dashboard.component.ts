import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  firstForm: UntypedFormGroup;
  radioGroupValue: any = 'No';
  AllGames: string[] = ["keno","bingo","spin","dog","soccer"];

  constructor(private fb: UntypedFormBuilder) {}
  
  ngOnInit(): void {
    this.firstForm = this.fb.group({
      amount: [null, [Validators.required]],
      coefficient: ['No'],
    });
  }

  onSubmitBet() {

  }

  onCancelBet(){

  }

  validateSubmit(){
    return false;
  }

}
