import {Component, OnDestroy, OnInit} from '@angular/core';
import { PostsService } from '../../shared/posts.service';
import { IPost } from '../../shared/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {
  post: IPost
  getSub: Subscription
  isLoading = true

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSub = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getSinglePost(params.id)
        })
      )
      .subscribe((response: IPost) => {
        this.post = response
        this.isLoading = false
      })
  }

  ngOnDestroy(): void {
    if (this.getSub) this.getSub.unsubscribe()
  }

}
