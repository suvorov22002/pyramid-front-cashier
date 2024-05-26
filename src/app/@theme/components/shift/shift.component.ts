import { Component, OnInit, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { Shift } from 'app/@core/data';
import { DialogShiftComponent } from './dialog-shift/dialog-shift.component';

@Component({
  selector: 'ngx-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {
  shift: Shift;

  constructor(private dialogService: NbDialogService) { }

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

  openShift() {
    //TODO: retrieves connected cashier's balance
  }

  closeShift() {

  }

  printShift() {
    this.dialogService.open(
      DialogShiftComponent,
      {
        context: '',
        closeOnBackdropClick: false,
      }).onClose.subscribe(confirm => {
        
      });
  }
}
