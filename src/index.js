import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';



const axios = require('axios').default;
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery')
const form = document.querySelector('.search-form');

document.querySelector('.load-more').style.display = 'none';
const loadMore = document.querySelector('.load-more');


let page = 1;
let perPage = 40;


async function getPhoto(name) {

  const photos = await axios.get(`https://pixabay.com/api/?key=28780636-ee20ed417c8a5aa1eeee48e35&q=${name}&image_type=photo&orientation=horizontal&safesearch=true$&per_page=${perPage}&page=${page}`);
  return photos.data.hits;
}




function makeList(photos) {

  if (photos.length === 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    document.querySelector('.load-more').style.display = 'none';
  } else {


    const galleryList = photos.map((photo) => {
      return `<div class="photo-card" >
    <a href=${photo.largeImageURL} class='gallery_link'><img src=${photo.webformatURL} width='400px' height='300px' alt=${photo.tags} title="" /></a>
  <div class="info" width='400px'>
    <p class="info-item">
      <b>Likes</b>
      <br>${photo.likes}</br> 
    </p>
    <p class="info-item">
      <b>Views</b>
      <br>${photo.views}</br> 
    </p>
    <p class="info-item">
      <b>Comments</b>
      <br>${photo.comments}</br> 
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <br>${photo.downloads}</br> 
    </p>
  </div>
</div>`

    }).join(' ')
    gallery.insertAdjacentHTML("beforeend", galleryList);;

    const lightBox = new simpleLightbox('.gallery_link', { captionSelector: 'img', captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250 });


  }
}

loadMore.addEventListener('click', () => {

  var inputText = input.value;
  page += 1;
  perPage += 40;
  getPhoto(inputText).then((photos) => {

    makeList(photos)

  })



})




form.addEventListener('submit', (evt) => {
  var inputText = input.value;
  gallery.innerHTML = '';

  getPhoto(inputText).then(photos => makeList(photos))

  document.querySelector('.load-more').style.display = 'block';
  evt.preventDefault();
  console.log('search done')






})











