import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NbDialogService } from '@nebular/theme';
import { DocumentationKenoComponent } from './documentation-keno/documentation-keno.component';
import { numOutCheck } from 'app/@core/data/keno-function/numoutcheck';
import { numAllCheck } from 'app/@core/data/keno-function/numallcheck';
import { colorChoice } from 'app/@core/data/keno-function/colorcheck';
import { sumCheck } from 'app/@core/data/keno-function/sumcheck';
import { firstNumber } from 'app/@core/data/keno-function/firstnumbercheck';
import { numberParity } from 'app/@core/data/keno-function/paritycheck';
import { numSimple } from 'app/@core/data/keno-function/simplecheck';
import { buscarDraw } from 'app/@core/data/keno-function';
import { CheckinComponent } from '../../checkin/checkin.component';
import { BettingService } from 'app/@core/service/betting.service';


@Component({
  selector: 'ngx-keno',
  templateUrl: './keno.component.html',
  styleUrls: ['./keno.component.scss']
})
export class KenoComponent implements OnInit, AfterViewInit {

  @ViewChild('barselectioncode') barcode: ElementRef<HTMLInputElement>;
  @ViewChild('alea') aleaValue: ElementRef<HTMLInputElement>;

  @ViewChildren(CheckinComponent)
  checkin;

  displayedColumns = ['event', 'pronostic', 'jeu', 'odd'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  selectionChoice: any;
  invalidSelection: boolean;
  regex = /^[.+*-/nN0123456789]+$/;
  selectionAlea: any;
  invalidAlea: boolean;
  aleaRegex = /^[1-9]{10}$/;
  jeuAlea: number;
  event: number = 300;
  eventState: 'Ouvert' | 'Fermé';
  canbet: boolean = true;
  num_tirage: any;
  isErrors: boolean = false;
  message: string;
  codePari: string;

  rows: any[] = [];
  allGamesData: any[];

  amount: any;

  ticket: any;

  constructor(private dialogService: NbDialogService, private bettingservice: BettingService) { }
  
  ngOnInit(): void {

    this.dataSource.data = this.rows;
    this.eventState = 'Ouvert';
    this.num_tirage = 1;

    var chrono = setInterval(() => {
      this.event--;
      if (this.event == 10) {
        this.eventState = 'Fermé';
        this.canbet = false;
        this.selectionAlea = '';
        clearInterval(chrono);
      }
    }, 1000);

    this.bettingservice.listEventOdds("KENO").subscribe(
      (res) => {
        this.allGamesData = res;
      }
    )

  }

  ngAfterViewInit(): void {
    console.log("Check view", this.checkin);
  }


  onKeySelectionEvent(event: any) {
    this.invalidSelection = this.regex.test(this.selectionChoice);
  }

  validateSelection(element: any) {

    if (this.invalidSelection) {

      this.dataSource.data = []; // clear tab

      var amounts = document.getElementById('amount') as HTMLInputElement;
      amounts.value = '';  // clear amount input
      this.checkin.first.amountValue = '';
      this.checkin.first.canBet = false;
      this.checkin.first.errorMessage = '';

      const echar = this.selectionChoice.charAt(0);

      let resultMessage: any;

      if (echar === '-') { // Non sortant
        
        resultMessage = {};
        resultMessage = numOutCheck(this.selectionChoice);

      }
      else if (echar === '+') { // Tout dedans
        
        resultMessage = {};
        resultMessage = numAllCheck(this.selectionChoice);

      }
      else if (echar === '*') {
        
        resultMessage = {};
        resultMessage = colorChoice(this.selectionChoice, '1er');

      }
      else if (echar === '/') {
        this.codePari = '';
        resultMessage = {};
        resultMessage = colorChoice(this.selectionChoice, '20e');
      }
      else if (this.selectionChoice.substring(0, 2) === '5-') {
        this.codePari = '';
        resultMessage = {};
        resultMessage = sumCheck(this.selectionChoice, '-202,5', 2, 'cinq 1er ');
      }
      else if (this.selectionChoice.substring(0, 2) === '5+') {
        this.codePari = '';
        resultMessage = {};
        resultMessage = sumCheck(this.selectionChoice, '+202,5', 2, 'cinq 1er ');
      }
      else if (this.selectionChoice.substring(0, 3) === '20-') {
        this.codePari = '';
        resultMessage = {};
        resultMessage = sumCheck(this.selectionChoice, '-810,5', 3, 'totale ');
      }
      else if (this.selectionChoice.substring(0, 3) === '20+') {
        this.codePari = '';
        resultMessage = {};
        resultMessage = sumCheck(this.selectionChoice, '+810,5', 3, 'totale ');
      }
      else if (this.selectionChoice.substring(0, 2) === '1-') {
        this.codePari = '';
        resultMessage = {};
        resultMessage = firstNumber(this.selectionChoice, '-40.5', 2, '');
      }
      else if (this.selectionChoice.substring(0, 2) === '1+') {
        this.codePari = '';
        resultMessage = {};
        resultMessage = firstNumber(this.selectionChoice, '+40.5', 2, '');
      }
      else if (this.selectionChoice.substring(0, 3) === "188") {
        this.codePari = '';
        resultMessage = {};
        resultMessage = numberParity(this.selectionChoice, 3, 'parite 1er numero');
      }
      else if (this.selectionChoice.substring(0, 3) === "189") {
        this.codePari = '';
        resultMessage = {};
        resultMessage = numberParity(this.selectionChoice, 3, 'parite dernier numero');
      }
      else if (this.selectionChoice.substring(0, 3) === "198") {
        this.codePari = '';
        resultMessage = {};
        resultMessage = numberParity(this.selectionChoice, 3, 'parite 1er numero');
      }
      else if (this.selectionChoice.substring(0, 3) === "199") {
        this.codePari = '';
        resultMessage = {};
        resultMessage = numberParity(this.selectionChoice, 3, 'parite dernier numero');
      }
      else {
        this.codePari = '';
        resultMessage = {};
        resultMessage = numSimple(this.selectionChoice);
      }

      if (resultMessage !== undefined) {
        
        var gameData = this.allGamesData.find(o => o.code === resultMessage.code);
        
        if(gameData !== undefined) {
          
          this.codePari = resultMessage.code;

          // Retrieve odd
          var choice = gameData.choice;
          var cotes = gameData.cote.split('_');
          switch(choice) {
            
            case "0":
              resultMessage.odd = cotes[0];
              break;
            case "1":
              resultMessage.odd = cotes[resultMessage.data.split('-').length];
              break;
            case "2":
              resultMessage.odd = cotes[resultMessage.data.split('-').length];
              break;
            default:
              resultMessage.odd = '';
          }
        
        }
        else{
          this.isErrors = true;
          this.message = 'Pari inconnu';
          this.codePari = '';
          return;
        }

        if (!resultMessage.isError) {

          this.rows = [];
          for (let i = 0; i < resultMessage.multiplicite; i++) {

            this.rows.push({
              "event": i + this.num_tirage,
              "pronostic": resultMessage.data,
              "jeu": resultMessage.message,
              "odd": resultMessage.odd
            });

          }

          this.dataSource.data = this.rows;
          document.getElementById('amount').focus();
          this.checkin.first.validSelection = true;

          this.ticket = {
            ...resultMessage,
            "event": this.num_tirage,
            "codePari": this.codePari,
            "game": "KENO"
          }

        }


        this.isErrors = resultMessage.isError;
        this.message = resultMessage.message;

      }
      else {
        this.message = 'Choix inconnu';
        this.isErrors = true;
      }

    }
    else {
      this.message = 'Choix inconnu';
      this.isErrors = true;
    }
  }

  onCancelSelection(selection: string) {
    this.dataSource.data = [];
    this.selectionChoice = '';
    this.selectionAlea = '';
    this.message = '';
    this.checkin.first.amountValue = '';
    this.checkin.first.canBet = false;
    this.checkin.first.errorMessage = '';
    document.getElementById('selection').focus();
  }

  aleaSelection(select: string) {
    
    this.onCancelSelection(select);
   
    switch (select) {
      case 'simple':
        this.jeuAlea = 0
        break;
      case 'nonout':
        this.jeuAlea = 1
        break;
      case 'allout':
        this.jeuAlea = 2
        break;
    }
    
    document.getElementById('alea').focus();
  }

  generateSelection() {

    this.invalidAlea = this.aleaRegex.test(this.selectionAlea);
    
    this.dataSource.data = [];
    this.selectionChoice = '';
    this.message = '';

    if (!this.invalidAlea) {

      var aleaChoix: number = +this.aleaValue.nativeElement.value;

      switch (this.jeuAlea) {

        case 0:

          if (aleaChoix > 10 || aleaChoix < 2) {

            this.isErrors = true;
            this.message = "Keno simple - Choix entre 2 et 10";
            return false;

          }
          else {

            this.isErrors = false;
            this.message = "Keno simple - " + aleaChoix + " Numeros";

          }

          break;

        case 1:

          if (aleaChoix > 10 || aleaChoix < 1) {

            this.isErrors = true;
            this.message = "Non sortants - Choix entre 1 et 10";
            return false;

          }
          else {

            this.isErrors = false;
            this.message = "Non sortants - " + aleaChoix + " Numeros";

          }

          break;

        case 2:

          if (aleaChoix > 6 || aleaChoix < 1) {

            this.isErrors = true;
            this.message = "Sortants - Choix entre 1 et 6";
            return false;

          }
          else {

            this.isErrors = false;
            this.message = "Sortants - " + aleaChoix + " Numeros";

          }

          break;
        
      }

      this.selectionChoice = buscarDraw(aleaChoix, this.jeuAlea);
      document.getElementById('selection').focus();

    }
  }

  showDocumentation() {
    this.dialogService.open(
      DocumentationKenoComponent,
      {
        context: {
          data: this.allGamesData
        },
        closeOnBackdropClick: true,
      }).onClose.subscribe(confirm => {

      });
  }

  classOfMessage() {

    if (this.isErrors) {
      return 'error';
    }
    else {
      return 'success';
    }
  }


}
