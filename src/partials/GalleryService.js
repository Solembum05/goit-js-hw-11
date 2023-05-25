const URL = 'https://pixabay.com/api/';
const API_KEY = '36678535-61ed1cb4f19d38d69cf379d72';
const axios = require('axios/dist/axios.min.js');

export default class GalleryService {
  constructor() {
    this.page = 1;
    this.q = '';
  }

  async getImg() {
    const { data } = await axios.get(
      `${URL}?key=${API_KEY}&q=${this.q}}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    this.incrementPage();
    return data.hits;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
