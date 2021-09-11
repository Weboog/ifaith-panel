import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AutoLoginGuard } from './guards/auto_login.guard';
import { IsloggedGuard } from './guards/islogged.guard';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent, canActivate: [AutoLoginGuard]},
  {
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [IsloggedGuard],
    loadChildren: () => import('../app/dashboard/dashboard.module').then( m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
