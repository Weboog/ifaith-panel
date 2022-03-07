import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { NetworkService } from 'src/app/services/network.service';
import { Channel } from 'src/app/types/channel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  channels$!: Observable<Channel[]>;
  channels!: Channel[];

  constructor(private network: NetworkService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.channels$ = this.route.data.pipe(
      map(data => {
        let cList = data.channelList;
        // console.log(cList);
        this.channels = cList;
        cList.map((channel: Channel) => {
          const f_date = new Date(<string>channel.created_at);
          channel.created_at = `${f_date.getFullYear()}/${f_date.getMonth() + 1}/${f_date.getDate()}`;
        })
        return cList;
      })
    );

  }

  deleteItem(hash: string): void {
    this.network.delete(hash).subscribe((response: {executed: boolean, hash: string}) => {
      if (response.executed) {
        let indexToDelete = <number>this.channels?.findIndex(channel => channel.hash == response.hash);
        if (indexToDelete > -1) {
          this.channels?.splice(indexToDelete, 1);
        }
      }
    });
  }

}
