import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NetworkService} from '../../../../services/network.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../../../types/category';

@Component({
  selector: 'app-c-item',
  templateUrl: './c-item.component.html',
  styleUrls: ['../../channel/item/item.component.scss']
})
export class CItemComponent implements OnInit {

  readonly logoAssets = 'https://services.ifaith.tv/media/logo/' //'http://ifaith-services.web/media/logo/'; //'https://services.ifaith.tv/media/logo/';
  @Input() loading = false;
  @Input() category!: Category;
  @Input() order!: number;
  @Output() deleteSelf = new EventEmitter<string>();

  constructor(private network: NetworkService, private  router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  // onDeactivate(hash: string): void {
  //
  //   const decision = !+this.category.active;
  //   this.network.active(hash, decision).subscribe((response: {executed: boolean, affectedRows: number}) => {
  //     if(response.executed) {
  //       if(response.affectedRows > 0) {
  //         this.channel.active = +decision
  //       }
  //     }
  //   });
  // }

  onDelete(id: string): void{
    if (id == '1') return;
    this.loading = true;
    this.deleteSelf.emit(id);
  }
}
