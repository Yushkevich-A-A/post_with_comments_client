import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export default class WidgetController {
  constructor(widget) {
    this.widget = widget;
    this.init();
  }

  init() {
    this.getNewPosts();
  }

  getNewPosts() {
    const stream$ = new Observable((observer) => {
      fetch('https://yushkevich-posts-server.herokuapp.com/posts/latest')
        .then((response) => response.json())
        .then((result) => {
          result.data.forEach((item) => observer.next(item));
        // observer.complete();
        }).catch((err) => observer.err(err));
    }).pipe(
      mergeMap((value) => ajax.getJSON(`https://yushkevich-posts-server.herokuapp.com/posts/${value.id}/comments/latest`).pipe(
        map((comments) => {
          value.comments = comments.data;
          return value;
        }),
      )),
    ).subscribe((v) => {
      this.widget.drawPost(v);
    });
  }
}
