import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IPost} from '../../shared/interfaces';
import {PostsService} from '../../shared/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup
  public created: boolean = false

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      author: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
    })
  }

  submit() {
    this.created = true

    if (this.form.invalid) {
      return
    }

    const post: IPost = {
      author: this.form.value.author,
      title: this.form.value.title,
      text: this.form.value.text,
      date: new Date()
    }

    this.postsService.create(post)
      .subscribe(() => {
        this.created = false
        this.form.reset()
      })
  }
}
