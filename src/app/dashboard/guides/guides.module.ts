import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { GuideComponent } from './guide/guide.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: ListComponent},
  { path: 'guide', component: GuideComponent },
];

@NgModule({
  declarations: [ListComponent, GuideComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class GuidesModule {}
