import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { NetworkService } from 'src/app/services/network.service';
import { Info } from 'src/app/types/info';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  channelInfo$!: Observable<{channelInfo: Info | false}>;
  qParams = {userId: '', channelId: '', channelName: ''};

  constructor(private route: ActivatedRoute, private network: NetworkService) { }

  ngOnInit(): void {
    this.channelInfo$ = this.route.queryParamMap.pipe(
      mergeMap(params => {
        this.qParams.userId = <string>params.get('uId');
        this.qParams.channelId = <string>params.get('cId');
        this.qParams.channelName = <string>params.get('cName');
        return this.network.getInfo(<string>params.get('uId'), <string>params.get('cId'))
      })
    )
  }

}
