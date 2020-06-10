import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts.service';
import { IPost } from '../../shared/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup
  post: IPost
  public submitted: boolean = false
  updateSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.updateSub = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getSinglePost(params.id)
        })
      )
      .subscribe((response: IPost) => {
        this.post = response

        this.form = new FormGroup({
          title: new FormControl(response.title, Validators.required),
          text: new FormControl(response.text, Validators.required),
        })
      })
  }

  ngOnDestroy(): void {
    if (this.updateSub) this.updateSub.unsubscribe()
  }

  submit(): void {
    this.submitted = true

    if (this.form.invalid) return

    this.postsService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text
    })
      .subscribe(() => {
        this.submitted = false
        this.alertService.callAlert({
          text: `Пост обновлен!`,
          type: 'dark'
        })
      })
  }
}
