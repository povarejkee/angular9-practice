import { Component, OnDestroy, OnInit } from '@angular/core'
import { PostsService } from '../../shared/posts.service'
import { Subscription } from 'rxjs'
import { IPost } from '../../shared/interfaces'
import { AlertService } from '../shared/services/alert.service'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: IPost[] = []
  public inputValue: string = ''
  public isLoading: boolean = true

  private getSub: Subscription
  private deleteSub: Subscription

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getSub = this.postsService
      .getPosts()
      .subscribe((response: IPost[]) => {
        this.posts = response
        this.isLoading = false
      })
  }

  remove(id: string): void {
    this.deleteSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post: IPost) => post.id !== id)
      this.alertService.callAlert({
        text: `Пост ${id} удален!`,
        type: 'danger',
      })
    })
  }

  ngOnDestroy(): void {
    if (this.getSub) this.getSub.unsubscribe()
    if (this.deleteSub) this.deleteSub.unsubscribe()
  }
}
