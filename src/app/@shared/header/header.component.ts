import { Component, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {


  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {
  }

  logout()
  {
    this.authService.logout()
    
  }

  ngOnDestroy() {}
}
