import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="image-info">
          <div class="info-item"><b>Likes</b><span>${likes}</span></div>
          <div class="info-item"><b>Views</b><span>${views}</span></div>
          <div class="info-item"><b>Comments</b><span>${comments}</span></div>
          <div class="info-item"><b>Downloads</b><span>${downloads}</span></div>
        </div>
      </li>
    `;
  }).join("");

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = "";
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}
