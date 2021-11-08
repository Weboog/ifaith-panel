import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  // loading = false;
  @Input() user!: User;
  active$!: Observable<{ status: boolean }>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.active$ = of({status: !!+this.user.active});
  }

  toggleBlock(hash: string) {
    // this.loading = true
    let decision = !(!!+this.user.active)
    this.userService.block(hash, decision).subscribe((response) => {
      if (response.done) {
        this.user.active = decision;
        this.active$ = of({status: decision})
      } else {
        this.user.active = !decision;
        this.active$ = of({status: !decision})
      }
      // this.loading = false;
    });
  }
}
