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
      fetch('http://192.168.1.148:7070/posts/latest')
        .then((response) => response.json())
        .then((result) => {
          result.data.forEach((item) => observer.next(item));
        // observer.complete();
        }).catch((err) => observer.err(err));
    }).pipe(
      mergeMap((value) => ajax.getJSON(`http://192.168.1.148:7070/posts/${value.id}/comments/latest`).pipe(
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
