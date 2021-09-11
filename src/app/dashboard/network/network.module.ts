import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ChannelComponent } from './channel/channel.component';
import { ListComponent } from './channel/list/list.component';
import { FormComponent } from './form/form.component';
import { ItemComponent } from './channel/item/item.component';
import { InformationComponent } from './information/information.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckChannelNameDirective } from 'src/app/validators/checkChannelName.directive';
import { CheckOrderNumberDirective } from 'src/app/validators/checkOrderNumber.directive';
import { ChannelListResolver } from 'src/app/guards/channel-list.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'channel', pathMatch: 'full' },
  {
    path: 'channel', component: ChannelComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent, resolve: {channelList: ChannelListResolver} },
      { path: 'form', component: FormComponent },
    ]
  },
  {
    path: 'information', component: InformationComponent,
    loadChildren: () => import('../network/information/information.module').then( m => m.InformationModule)
  },
];



@NgModule({
  declarations: [
    ChannelComponent,
    FormComponent,
    ListComponent,
    ItemComponent,
    InformationComponent,
    CheckOrderNumberDirective,
    CheckChannelNameDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class NetworkModule { }
