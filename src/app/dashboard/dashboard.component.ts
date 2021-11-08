import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {User} from "../types/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user!: User;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    let header = document.querySelector('header') as HTMLElement;
    let width = window.innerWidth - 20 - 195;
    header.style.width = `${width}px`;
    header.style.marginLeft = '200px';
    window.addEventListener('resize', () => {
      let width = window.innerWidth - 20 - 195;
      header.style.width = `${width}px`;
    })
  }

  onLogout(): void{
    this.auth.clearToken();
    this.router.navigate(['/login']);
  }

}
