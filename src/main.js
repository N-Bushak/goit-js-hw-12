import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let query = "";
let page = 1;
let totalHits = 0;

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = event.currentTarget.elements['search-text'].value.trim();
  page = 1;

  if (query === "") {
    iziToast.warning({ message: "Search field cannot be empty!" });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({ message: "Sorry, there are no images matching your search query. Please try again!" });
      return;
    }

    createGallery(data.hits);
    if (totalHits > 15) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: "An error occurred. Please try again later." });
  } finally {
    hideLoader();
    event.target.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    const card = document.querySelector('.gallery-item');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    const totalLoadedPages = Math.ceil(totalHits / 15);
    if (page >= totalLoadedPages) {
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: "Failed to load more images." });
  } finally {
    hideLoader();
  }
});