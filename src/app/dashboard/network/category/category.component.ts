import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, ParamMap, Route} from '@angular/router';
import {Channel} from '../../../types/channel';
import {NetworkService} from '../../../services/network.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  mode!: string;

  list: Channel[] = [];

  constructor(private network: NetworkService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.mode = <string>params.get('mode');
    })
    // this.network.list().subscribe((channels: Channel[]) => {
    //   this.list = channels;
    // })
  }

}
