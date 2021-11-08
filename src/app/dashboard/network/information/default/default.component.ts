import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import { NetworkService } from 'src/app/services/network.service';
import { Info } from 'src/app/types/info';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  channelInfo$!: Observable<Info | null>;
  qParams = {userHash: '', channelHash: '', channelName: ''};

  constructor(private route: ActivatedRoute, private network: NetworkService) { }

  ngOnInit(): void {
    // this.network.getInfo(<string>this.route.snapshot.queryParamMap.get('cHs')).subscribe(response => {
    //   console.log(response);
    // })
    this.channelInfo$ = this.route.queryParamMap.pipe(
      mergeMap(params => {
        this.qParams.userHash = <string>params.get('uHs');
        this.qParams.channelHash = <string>params.get('cHs');
        this.qParams.channelName = <string>params.get('cName');
        return this.network.getInfo(<string>params.get('cHs')).pipe(
          map(cInfo => {
            // @ts-ignore
            cInfo?.channel_name = this.qParams.channelName;
            return cInfo;
          })
        );
      })
    )
  }

}
