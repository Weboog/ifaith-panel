import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { DetailsComponent } from './details/details.component';
import { InfoFormComponent } from './info-form/info-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NetworkModule} from '../network.module';

const routes: Routes = [
  {path: '', redirectTo: 'default' , pathMatch: 'full'},
  {path: 'default', component: DefaultComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'new', component: InfoFormComponent},
  {path: 'edit/:id', component: InfoFormComponent}
];

@NgModule({
  declarations: [
    DetailsComponent,
    DefaultComponent,
    InfoFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NetworkModule
  ]
})
export class InformationModule { }
