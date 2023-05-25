import GalleryService from './partials/GalleryService.js';
import LoadMoreBtn from './partials/loadMoreBtn.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const galleryService = new GalleryService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '#load-more',
  isHidden: true,
});
const refs = {
  form: document.getElementById('search-form'),
  gallery: document.getElementById('gallery'),
};

refs.form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchMoreIMG);

async function fetchMoreIMG() {
  loadMoreBtn.disable();

  try {
    const markup = await getMarkup();
    if (!markup) throw new Error();
    updateMarkup(markup);
  } catch (err) {
    onError(err);
  }

  loadMoreBtn.enable();
}

function onSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const value = form.elements.searchQuery.value.trim();
  if (value === '') return;
  else {
    galleryService.q = value;
    galleryService.resetPage();

    loadMoreBtn.show();

    clearGallery();
    fetchMoreIMG().finally(() => form.reset());
  }
}

async function getMarkup() {
  try {
    const hits = await galleryService.getImg();
    Notify.success('Hooray! We found totalHits images.');
    if (!hits) {
      loadMoreBtn.hide();
      return '';
    }

    if (hits.length === 0)
      throw new Error(
        Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        )
      );

    return hits.reduce((markup, el) => createMarkup(el) + markup, '');
  } catch (err) {
    onError(err);
  }
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
}

function updateMarkup(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
function clearGallery() {
  refs.gallery.innerHTML = '';
}
function onError() {
  loadMoreBtn.hide();
  refs.gallery.innerHTML = ``;
}

// Notify.info('Sorry, there are no images matching your search query. Please try again.');
