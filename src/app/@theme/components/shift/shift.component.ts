import { Component, OnInit, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { Shift } from 'app/@core/data';
import { DialogShiftComponent } from './dialog-shift/dialog-shift.component';
import { GlobalService } from 'app/@core/service/global.service';
import { ShiftService } from 'app/@core/service/shift.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {

  //@ts-ignore
  shift: Shift = {};
  isLoading: boolean = false;
  opened: boolean = false;

  constructor(private dialogService: NbDialogService, private globalService: GlobalService, private shiftservice: ShiftService) { }

  get globalBalance(): number {
    return this.globalService.globalBalance;
  }

  set globalBalance(value: number) {
    this.globalService.globalBalance = value;
  }

  ngOnInit(): void {
    this.searchShift();
  }

  openShift() {

    var data = {
      "login": localStorage.getItem('login'),
      "partner": localStorage.getItem('partner'),
      "salle": localStorage.getItem('salle')
    }

    this.isLoading = true;

    this.shiftservice.openShift(data).subscribe(
      (res: Shift) => {
        this.isLoading = false;
        this.opened = true;
        this.shift = res;
        this.globalBalance = res.startBalance;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    )
  }

  closeShift() {
    var data = {
      "login": localStorage.getItem('login'),
      "partner": localStorage.getItem('partner'),
      "salle": localStorage.getItem('salle')
    }

    this.isLoading = true;

    this.shiftservice.summarizeShift(data).subscribe(
      (res: Shift) => {
        console.log("Shift", res)
        this.isLoading = false;
        this.shift = res;
        this.globalBalance = res.endBalance;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    )
  }

  searchShift() {

    var data = {
      "login": localStorage.getItem('login'),
      "partner": localStorage.getItem('partner'),
      "salle": localStorage.getItem('salle'),
      "shiftStatus": "OPEN"
    }

    forkJoin([this.shiftservice.selectShift(data), this.shiftservice.retrieveCashierInfo(data.partner, data.login)])
      .subscribe(
        (res: any[]) => {
          var res1 = res[0];
          var res2 = res[1];
         
          if (res1 != null) {
            this.shift = res1;
            this.globalBalance = res2.balance;
            this.opened = true;
          }
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      )
  }

  printShift() {

    var data = {
      "login": localStorage.getItem('login'),
      "partner": localStorage.getItem('partner'),
      "salle": localStorage.getItem('salle')
    }

    this.isLoading = true;

    this.shiftservice.closeShift(data).subscribe(
      (res: Shift) => {
        this.isLoading = false;
        this.shift = res;
        this._printShift(res);
        this.globalBalance = 0;
        this.opened = false;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    )

  }

  _printShift(shift: Shift) {
    this.dialogService.open(
      DialogShiftComponent,
      {
        context: {
          data: shift
        },
        closeOnBackdropClick: false,
      }).onClose.subscribe(confirm => {

      });
  }

  logout() { }
}
