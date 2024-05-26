import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {

  firstForm: UntypedFormGroup;
  radioGroupValue: any = 'No';

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
