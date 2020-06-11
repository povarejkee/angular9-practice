import { Component, OnDestroy, OnInit } from '@angular/core'
import { PostsService } from '../../shared/posts.service'
import { IPost } from '../../shared/interfaces'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  public posts: IPost[] = []
  public isLoading: boolean = true

  private getSub: Subscription

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.getSub = this.postsService
      .getPosts()
      .subscribe((response: IPost[]) => {
        this.posts = response
        this.isLoading = false
      })
  }

  ngOnDestroy(): void {
    if (this.getSub) this.getSub.unsubscribe()
  }
}
