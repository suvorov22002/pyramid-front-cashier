import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Shift } from 'app/@core/data';
import { BetKeno } from 'app/@core/data/betKeno';
import { addMinutesToDate } from 'app/@core/utils';

@Component({
  selector: 'ngx-dialog-slip',
  templateUrl: './dialog-slip.component.html',
  styleUrls: ['./dialog-slip.component.scss']
})
export class DialogSlipComponent implements OnInit{
  
  shift: Shift;
  startDate: Date;
  startBalance: any;
  endBalance: any;
  data: BetKeno;
  allRounds: any[] = [];

  elementType = 'img'; //svg, canvas
  format = 'CODE128';
  lineColor = '#000000';
  width = 2;
  height = 100;
  displayValue = true;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 5;
  marginTop = 5;
  marginBottom = 5;
  marginLeft = 5;
  marginRight = 5;

  constructor(protected ref: NbDialogRef<DialogSlipComponent>){}
  
  ngOnInit(): void {

    for(let i=0; i<this.data.multipleRound; i++) {

      var newDate: Date = addMinutesToDate(this.data.createdAt, 6*i);
      
      var dat = {
        "fecha":  newDate,
        "event":  i + this.data.numeroTirage,
        "choice": this.data.selection
      }
      this.allRounds.push(dat);
    }
  
  }

  close(){
    this.ref.close(null);
  }

}
