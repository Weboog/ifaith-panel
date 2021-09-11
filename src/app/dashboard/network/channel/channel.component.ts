import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { Channel } from 'src/app/types/channel';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

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
