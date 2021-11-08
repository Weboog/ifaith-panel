import { Component, OnInit } from '@angular/core';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {

  show = false;

  constructor(private loading: LoadingService) { }

  ngOnInit(): void {
    this.loading.on?.subscribe(v => {
      // this.show = v;
      console.log(v)
    })
  }

}
