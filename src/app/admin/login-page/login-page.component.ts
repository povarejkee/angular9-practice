import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { IUser } from '../../shared/interfaces'
import { AuthService } from '../shared/services/auth.service'
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup
  public submitted: boolean = false
  public accessMessage: string = ''

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setAccessMessage()

    this.form = new FormGroup({
      email: new FormControl('ip@test.ru', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    })
  }

  setAccessMessage(): void {
    this.route.queryParams.subscribe((qp: Params) => {
      if (qp.loginFirst) {
        this.accessMessage = 'Войдите для получения прав администратора'
      } else if (qp.sessionIsOver) {
        this.accessMessage =
          'Текущая сессия завершена. Войдите снова, чтобы продолжить'
      }
    })
  }

  submit(): void {
    this.submitted = true

    if (this.form.invalid) return

    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    }

    this.authService.login(user).subscribe(
      () => {
        this.form.reset()
        this.submitted = false
        this.router.navigate(['/admin', 'dashboard'])
      },
      () => (this.submitted = false)
    )
  }
}
