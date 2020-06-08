import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  goBack(): void {
    if (this.authService.isAuth()) {
      this.router.navigate(['/admin', 'dashboard'])
    } else {
      this.router.navigate(['/admin'])
    }
  }

}
