import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from '../../shared/interfaces';

@Pipe({
  name: 'filterPosts'
})
export class FilterPostsPipe implements PipeTransform {
  transform(posts: IPost[], value: string): IPost[] {
    return posts.filter(({ title }) => title.toLowerCase()
      .includes(value.toLowerCase()))
  }
}
