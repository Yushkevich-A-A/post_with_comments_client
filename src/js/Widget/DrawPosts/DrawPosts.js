import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class DrawPosts {
  constructor() {
    this.init();
  }

  init() {
    this.drawWidget();
  }

  drawWidget() {
    this.widget = document.createElement('div');
    this.widget.classList.add('wrapper-widget');
    this.widget.innerHTML = `<div class="widget-posts-list">
                                <ul class="posts-list">
                                </ul>
                              </div>`;
    document.body.appendChild(this.widget);
    this.postList = this.widget.querySelector('.posts-list');
  }

  drawPost(data, commentData) {
    const li = document.createElement('li');
    li.classList.add('post-item');
    li.innerHTML = `<div class="block-post">
    <div class="block-post-info-user">
      <div class="block-post-avatar">
        <img class="img-avatar" src="#" alt="">
      </div>
      <div class="block-post-name-date">
        <div class="block-post-name">Alex Petrov</div>
        <div class="block-post-date">18:44 20.03.19</div>
      </div>
    </div>
    <div class="block-post-content">
      <div class="content-post">
        <div class="post-title-block">
          <h2 class="post-title"></h2>
        </div>
        <div class="post-content">
          <img class="post-content-img" src="#" alt="">
        </div>
      </div>
      <div class="content-comments">
        <div class="comments-title-block">
          <h2 class="comments-title">Latest comments</h2>
        </div>
        <div class="block-comments">
          <div class="block-comments-list">
            <ul class="comments-list">
            </ul>
          </div>
          <div class="button-load-comments">
            Load More
          </div>
        </div>
      </div>
    </div>
  </div>`;
  this.postList.appendChild(li);
  li.dataset.id = data.id;
  const imgAvatar = li.querySelector('.img-avatar');
  imgAvatar.src = data.avatar;
  const blockPostName = li.querySelector('.block-post-name');
  blockPostName.textContent = data.author;
  blockPostName.dataset.author_id = data.author_id;
  const blockPostDate = li.querySelector('.block-post-date');
  blockPostDate.textContent = moment(data.created).format('HH:mm DD.MM.YYYY');
  const postTitle = li.querySelector('.post-title');
  postTitle.textContent = data.postTitle;
  const postContentImg = li.querySelector('.post-content-img');
  postContentImg.src = data.image;
  const commentsList = li.querySelector('.comments-list');
  this.drawComments(commentData, commentsList);
  }

  drawComments(data, parentElement) {
    for (let i of data) {
      this.drawComments(i, parentElement);
    }
  }

  drawComments(data, parentElement) {
    const li = document.createElement('li');
    li.classList.add('comment-item');
    li.innerHTML = `<div class="block-comment-info">
                      <div class="block-comment-avatar">
                        <img class="img-comment-avatar" src="#" alt="">
                      </div>
                      <div class="block-comment-content">
                        <div class="comment-content">
                          <div class="comment-username">Alexandra Petrova</div>
                          <div class="comment-date">18:50 20.03.19</div>
                        </div>
                        <div class="comment-text">Привет Мир!!</div>
                      </div>
                    </div>`;
  parentElement.appendChild(li);
  li.dataset.id = data.id;
  li.dataset.post_id = data.post_id;
  const imgCommentAvatar = li.querySelector('.img-comment-avatar');
  imgCommentAvatar.src = data.avatar;
  const commentUsername = li.querySelector('.comment-username');
  commentUsername.textContent = data.author;
  commentUsername.dataset.author_id = data.author_id;
  const commentDate = li.querySelector('.comment-date');
  commentDate.textContent = moment(data.created).format('HH:mm DD.MM.YYYY');
  const commentText = li.querySelector('.comment-text');
  commentText.textContent = data.content;
  }

}