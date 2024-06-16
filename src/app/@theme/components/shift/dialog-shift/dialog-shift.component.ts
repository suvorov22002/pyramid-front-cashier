import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Shift } from 'app/@core/data';

@Component({
  selector: 'ngx-dialog-shift',
  templateUrl: './dialog-shift.component.html',
  styleUrls: ['./dialog-shift.component.scss']
})
export class DialogShiftComponent implements OnInit{
 
  shift: Shift;
  startDate: Date;
  startBalance: any;
  endBalance: any;

  constructor(protected ref: NbDialogRef<DialogShiftComponent>){}

  ngOnInit(): void {
    this.shift = {
      totalSlip: 400,
      paidSlip: 102,
      revoqSlip: 3,
      totalPayin: 358650,
      totalPayout: 323700,
      totalRevoq: 4000,
      totalBalance: 15000,
      startDate: new Date(),
      endDate: new Date(),
      startBalance: 1000000,
      endBalance: 634510,
      user: "Joselu"
    }
  }

  close(){
    this.ref.close(null);
  }
}
