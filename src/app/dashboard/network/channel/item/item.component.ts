import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { Channel } from 'src/app/types/channel';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  readonly logoAssets = 'https://services.ifaith.tv/media/logo/' //'http://ifaith-services.web/media/logo/'; //'https://services.ifaith.tv/media/logo/';
  loading = false;
  @Input() channel!: Channel;
  @Output() deleteSelf = new EventEmitter<string>();

  constructor(private network: NetworkService, private  router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  onDeactivate(hash: string): void {

    const decision = !+this.channel.active;
    this.network.active(hash, decision).subscribe((response: {executed: boolean, affectedRows: number}) => {
      if(response.executed) {
        if(response.affectedRows > 0) {
          this.channel.active = +decision
        }
      }
    });
  }

  onDelete(hash: string): void{
    this.loading = true;
    this.deleteSelf.emit(hash);
  }

}
