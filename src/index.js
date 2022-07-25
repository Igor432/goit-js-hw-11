import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
const axios = require('axios').default;



const input = document.querySelector('input');
const gallery = document.querySelector('.gallery')
const form = document.querySelector('.search-form');
const totalFound = document.querySelector('.total_found')


document.querySelector('.load-more').style.display = 'none';
const loadMore = document.querySelector('.load-more');


let page = 1;
let perPage = 40;
let totalPage = ''
let totalImages = ''

async function getPhoto(name) {


  const photos = await axios.get(`https://pixabay.com/api/?key=28780636-ee20ed417c8a5aa1eeee48e35&q=${name}&image_type=photo&orientation=horizontal&safesearch=true$&per_page=${perPage}&page=${page}`);

  totalImages = photos.data.totalHits
  totalPage = photos.data.totalHits / perPage

  if (totalPage === 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    totalFound.innerHTML = ` Shit! We found no images.`

  } else {

    console.log(totalPage)

    totalFound.innerHTML = ` Hooray! We found ${photos.data.totalHits} images.`
  }

  return photos.data.hits;

}





function makeList(photos) {

  if (photos.length === 0) {

    document.querySelector('.load-more').style.display = 'none';
  } else {
    console.log(photos)

    const galleryList = photos.map((photo) => {
      return `<div class="photo-card" >
    <a href=${photo.largeImageURL} class='gallery_link'><img src=${photo.webformatURL} width='400px' height='300px' alt=${photos.tags} title="" /></a>
  <div class="info" width='400px'>
    <p class="info-item">
      <b>Likes</b>
      <br class = 'photo_value'>${photo.likes}</br> 
    </p>
    <p class="info-item">
      <b>Views</b>
      <br class = 'photo_value'>${photo.views}</br> 
    </p>
    <p class="info-item">
      <b>Comments</b>
      <br class = 'photo_value'>${photo.comments}</br> 
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <br class = 'photo_value'>${photo.downloads}</br> 
    </p>
  </div>
</div>`

    }).join(' ')
    gallery.insertAdjacentHTML("beforeend", galleryList);;

    const lightBox = new simpleLightbox('.gallery_link', { captionSelector: 'img', captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250 });


  }
}





form.addEventListener('change', (evt) => {
  console.log(evt.target.value)
  page = 1;
  perPage = 40;
})


form.addEventListener('submit', (evt) => {
  var inputText = input.value;
  document.addEventListener('scroll', scrollInfinite)

  gallery.innerHTML = '';
  getPhoto(inputText)
    .then(photos => makeList(photos))
    .catch((error) => console.log(error))

  evt.preventDefault();
  console.log('search done')

})


/*

loadMore.addEventListener('click', () => {

  var inputText = input.value;

  page += 1;
  perPage <= 40;
  getPhoto(inputText).then((photos) => {
    if (photos.length === 0) {
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")

    }
    makeList(photos)
  }
  )
}
)

*/


function removeScroll() {
  document.removeEventListener('scroll', scrollInfinite);

}


document.addEventListener('scroll', scrollInfinite)



function scrollInfinite() {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {

    var inputText = input.value;

    page += 1;
    perPage <= 40;
    getPhoto(inputText).then((photos) => {
      if (photos.length === 0) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
        removeScroll();
      } else {

        makeList(photos)
      }
    }
    )
  }



}



