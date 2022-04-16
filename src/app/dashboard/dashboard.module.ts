import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NetworkComponent } from './network/network.component';
import { UsersComponent } from './users/users.component';
import { GuidesComponent } from './guides/guides.component';

const routes: Routes = [
  {path: '', redirectTo: 'network', pathMatch: 'full'},
  {path: 'network', component: NetworkComponent, loadChildren: () => import('../dashboard/network/network.module').then( m => m.NetworkModule)},
  {path: 'users', component: UsersComponent, loadChildren: () => import('../dashboard/users/users.module').then( m => m.UsersModule)},
  {path: 'guides', component: GuidesComponent, loadChildren: () => import('../dashboard/guides/guides.module').then( m => m.GuidesModule)}
];

@NgModule({
  declarations: [
    NetworkComponent,
    UsersComponent,
    GuidesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
