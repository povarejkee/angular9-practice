import { Component, Input, OnInit } from '@angular/core'
import { IPost } from '../../../../shared/interfaces'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() public post: IPost

  constructor() {}

  ngOnInit(): void {}
}
