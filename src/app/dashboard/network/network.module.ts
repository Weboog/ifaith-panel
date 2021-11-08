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
import {SelectComponent} from '../../shared/select/select.component';
import {LoadingIndicatorComponent} from '../../shared/loading-indicator/loading-indicator.component';
import {LoadingComponent} from '../../shared/loading/loading.component';
import { CategoryComponent } from './category/category.component';
import { CListComponent } from './category/c-list/c-list.component';
import { CItemComponent } from './category/c-item/c-item.component';
import {CategoryListResolver} from '../../guards/category-list.resolver';
import { CFormComponent } from './category/c-form/c-form.component';

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
    path: 'categories', component: CategoryComponent, children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: CListComponent, resolve: {categoryList: CategoryListResolver}},
      {path: 'form', component: CFormComponent}
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
    SelectComponent,
    CheckOrderNumberDirective,
    LoadingIndicatorComponent,
    LoadingComponent,
    CategoryComponent,
    CListComponent,
    CItemComponent,
    CFormComponent
  ],
  exports: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class NetworkModule { }
