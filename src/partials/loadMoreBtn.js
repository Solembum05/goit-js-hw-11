export default class LoadMoreBtn {
  static classes = {
    hidden: 'hidden',
  };

  constructor({ selector, isHidden }) {
    this.button = this.getButton(selector);
    isHidden && this.hide();
  }

  getButton(selector) {
    return document.querySelector(selector);
  }

  hide() {
    this.button.classList.add(LoadMoreBtn.classes.hidden);
  }

  show() {
    this.button.classList.remove(LoadMoreBtn.classes.hidden);
  }

  disable() {
    this.button.disabled = true;
    this.button.textContent = 'Loading...';
  }

  enable() {
    this.button.disabled = false;
    this.button.textContent = 'Load more';
  }

  end() {
    this.button.disabled = true;
    this.button.textContent = 'The end!';
  }
}
