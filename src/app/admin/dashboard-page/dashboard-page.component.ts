import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts.service';
import { Subscription } from 'rxjs';
import { IPost } from '../../shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  sub: Subscription
  posts: IPost[] = []

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.sub = this.postsService.getPosts()
      .subscribe(response => {
        console.log(response)
        this.posts = response
      })
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe()
  }
}
