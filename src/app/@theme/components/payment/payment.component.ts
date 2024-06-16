import { AfterViewInit, Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Slip, Statut } from 'app/@core/data';
import { BetKeno } from 'app/@core/data/betKeno';
import { BettingService } from 'app/@core/service/betting.service';

@Component({
  selector: 'ngx-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {

  displayedColumns = ['event', 'odd', 'game', 'selection', 'resultat', 'prix', 'coefficient'];
  dataSource: MatTableDataSource<Slip> = new MatTableDataSource();
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('barcode') barcode: ElementRef<HTMLInputElement>;

  isBarcodeLength: boolean = true;
  isVersement: boolean = true;
  isChecked: boolean = false;
  isBonus: boolean = false;

  betKeno: BetKeno;
  miseTotale: any;
  prixTotal: any;
  montantGain: any;
  bonusAmount: any;

  message: string;
  statutVersement: string;

  constructor(private bettingservice: BettingService) { }


  ngOnInit(): void {
    var name = 'Angular ' + VERSION.major;
    //this.dataSource.data = this.allEvents;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onCheckBarcode(barcode: string) {
    console.log("Barcode = " + barcode)
    this.isLoading = true;
    this.bettingservice.checkKenoBet(barcode).subscribe(
      (res: BetKeno) => {
        console.log("res", res)
        if (res !== undefined && res !== null) {
          setTimeout(() => {
            this.isLoading = false
            this.isChecked = true;

            if (res.bonusAmount !== undefined || res.bonusAmount !== 0) {
              this.bonusAmount = res.bonusAmount;
              this.isBonus = true;
            }

            console.log("STATUS: " + res.status)

            switch(res.status) {

              case Statut.TCKNRECON:
                this.message = Statut.TCKNRECON;
                break;
              case Statut.TCKNEVAL:
                this.message = Statut.TCKNEVAL;
                this.dataSource.data = res.slips;
                this.miseTotale = res.montantMise;
                this.prixTotal = res.slips[0]?.prix;
                break;
              case Statut.TCKALRPAID:
                this.message = Statut.TCKGAGNANT;
                this.statutVersement = Statut.TCKALRPAID;
                this.dataSource.data = res.slips;
                this.miseTotale = res.montantMise;
                this.prixTotal = res.slips[0]?.prix;
                this.montantGain = res.montantGainMax;
                this.isVersement = true;
                break;
              case Statut.TCKGAGNANT:
                this.message = Statut.TCKGAGNANT;
                //this.statutVersement = Statut.TCKGAGNANT;
                this.dataSource.data = res.slips;
                this.miseTotale = res.montantMise;
                this.prixTotal = res.slips[0]?.prix;
                this.montantGain = res.montantGainMax;
                this.isVersement = false;
                break;
              case Statut.TCKPERDANT:
                this.message = Statut.TCKPERDANT;
                //this.statutVersement = Statut.TCKPERDANT;
                this.dataSource.data = res.slips;
                this.miseTotale = res.montantMise;
                this.prixTotal = res.slips[0]?.prix;
                this.montantGain = res.montantGainMax;
                this.isVersement = true;
                break;
              default:
                this.message = Statut.TCKNRECON;
          }
           
            this.isVersement = !((this.statutVersement != Statut.TCKALRPAID && this.montantGain > 0) || this.message === 'PERDANT')

          }, 5000)
        }
        else {
          this.isLoading = false;
          this.isChecked = true;
          this.message = Statut.TCKNRECON;
          return;
        }

      },
      (error) => {
        this.isLoading = false;
        console.log(error)
      }
    )

  }

  validateBarcode() {
    return this.isBarcodeLength;
  }

  onPaiement() {
    console.log("paiement")
  }

  onCancel() {

    console.log(this.barcode.nativeElement.value);
    this.dataSource.data = [];
    this.bonusAmount = '';
    this.statutVersement = '';
    this.isVersement = true;
    this.isChecked = false;
    this.miseTotale = '';
    this.montantGain = '';
    this.message = '';
    this.prixTotal = '';
    this.barcode.nativeElement.value = '';
    this.isBarcodeLength = true;

  }

  onKeyBarcodeEvent(event: any) {
    var barcode = event.target.value
    //console.log(barcode);
    //console.log("Event length: " + barcode.length)
    this.isBarcodeLength = (barcode.length > 17) ? false : true;
  }

  searchBarcode(event: any) {
    var barcode = event.target.value
    this.isBarcodeLength = (barcode.length > 17) ? false : true;

    if (this.isBarcodeLength) return;

    console.log("Can process...")
  }

  getStatuVersement() {
    if (this.statutVersement !== '' && this.statutVersement !== undefined) {
      return Statut.TCKALRPAID
    }

  }

  getClassOf(val) {
    if (val === 'perdant') {
      return 'red';
    } else if (val === 'gagnant'){
      return 'green'
    }
  }

  getMessageClass() {
    if (this.message === 'Perdant') {
      return 'red';
    }
    else if (this.message === 'Gagnant') {
      return 'green';
    }
    else {
      return 'warning';
    }
  }
}
