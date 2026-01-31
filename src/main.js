import './css/styles.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const searchForm = document.querySelector('.form');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const form = event.currentTarget;
  const query = form.elements['search-text'].value.trim();

  if (query === "") {
    iziToast.warning({ 
        message: "Search field cannot be empty!",
        position: 'topRight' 
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message: "Sorry, there are no images matching your search query. Please try again!",
          position: 'topRight'
        });
        return;
      }
      
      createGallery(data.hits);
    })
    .catch(error => {
      iziToast.error({ 
          message: "An error occurred while fetching images. Please try again later.",
          position: 'topRight'
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
});