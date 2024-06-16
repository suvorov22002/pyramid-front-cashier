import { NgModule } from '@angular/core';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbListModule, NbRadioModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const formulaireModule = [
  NbInputModule,
  NbActionsModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
  NbSelectModule,
  NbIconModule,
  NbButtonModule
];


@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbTabsetModule,
    NbListModule,
    FormsModule,
    ReactiveFormsModule,
    ...formulaireModule
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }