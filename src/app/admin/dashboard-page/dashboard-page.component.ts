import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts.service';
import { Subscription } from 'rxjs';
import { IPost } from '../../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  getSub: Subscription
  deleteSub: Subscription
  posts: IPost[] = []
  inputValue = ''
  isLoading = true

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getSub = this.postsService.getPosts()
      .subscribe((response: IPost[]) => {
        this.posts = response
        this.isLoading = false
      })
  }

  remove(id: string) {
    this.deleteSub = this.postsService.remove(id)
      .subscribe(() => {
        this.posts = this.posts.filter((post: IPost) => post.id !== id)
        this.alertService.callAlert({
          text: `Пост ${id} удален!`,
          type: 'danger'
        })
      })
  }

  ngOnDestroy(): void {
    if (this.getSub) this.getSub.unsubscribe()
    if (this.deleteSub) this.deleteSub.unsubscribe()
  }
}
