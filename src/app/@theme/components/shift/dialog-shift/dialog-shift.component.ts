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
  data: any;

  constructor(protected ref: NbDialogRef<DialogShiftComponent>){}

  ngOnInit(): void {
    this.shift = this.data;
  }

  close(){
    this.ref.close(null);
  }
}
