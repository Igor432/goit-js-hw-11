import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
const axios = require('axios').default;

import OnlyScroll from 'only-scrollbar';



const input = document.querySelector('input');
const gallery = document.querySelector('.gallery')
const form = document.querySelector('.search-form');
const totalFound = document.querySelector('.total_found')
const pageList = document.querySelector('.page_list')
document.querySelector('.load-more').style.display = 'none';
const loadMore = document.querySelector('.load-more');
const loader = document.querySelector('.loader')
const trainList = document.querySelector('.page_list_two')
let perPage = 40;

let totalImages = 0;



async function getPhoto(name, page) {


  const photos = await axios.get(`https://pixabay.com/api/?key=28780636-ee20ed417c8a5aa1eeee48e35&q=${name}&image_type=photo&orientation=horizontal&safesearch=true$&per_page=${perPage}&page=${page}`);

  totalImages = photos.data.totalHits
  const totalPage = photos.data.totalHits / perPage

  if (totalPage === 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    totalFound.innerHTML = ` Shit! We found no images.`

  } else {


    totalFound.innerHTML = ` Hooray! We found ${photos.data.totalHits} images.`
  }
  pageList.innerHTML = ''
  pageButtons(totalPage)
  addButtonfunc(name)
  return photos.data.hits;


}











function makeList(photos) {





  if (photos.length === 0) {

    document.querySelector('.load-more').style.display = 'none';
  } else {
    console.log(photos)

    const galleryList = photos.map((photo) => {
      return `<div class="photo_card" width='500px' height='400px'  >
    <a href=${photo.largeImageURL} id='gallery-link'  class='gallery_link'><img src=${photo.webformatURL}  alt=${photos.tags} title="" class="img-link" width='400px' height='300px'/></a>
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


    const scroll = new OnlyScroll(document.querySelector('.photo_card'))



  }

  hideLoader()

}










function createButton(index) {
  let pageNum = document.createElement('button')
  pageNum.innerHTML = index
  pageNum.setAttribute("page-index", index);
  pageNum.className = 'page_item'
  pageList.appendChild(pageNum)

}

function pageButtons(totalPage) {

  for (i = 1; i <= totalPage; i++) {
    createButton(i)
  }



}

function addButtonfunc(name) {

  let pageItem = document.querySelectorAll('.page_item')


  /*
    let pagination = Object.keys(pageItem)
    pagination = pagination.map((number, index) => {
      return (
        `<li><button page-index=${index} class='page_item_two'>${number}</button></li>`
  
      )
    }).join(' ')
  
    const train_buttons = document.querySelector('.page_item_two')
    console.log(train_buttons)
  
  
    trainList.innerHTML = pagination
  */

  pageItem.forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));




    if (pageIndex) {
      button.addEventListener("click", () => {
        console.log(pageIndex)
        gallery.innerHTML = '';
        loader.classList.remove('is-hidden')



        getPhoto(name, pageIndex)
          .then(photos => makeList(photos))

          .catch((error) => console.log(error))

      }, console.log(pageItem));
    }
  }
  )

}

/*
function addTrain() {
  console.log(train_buttons)
  const train_buttons = document.querySelector('.page_item_two')
  train_buttons.forEach(button => {
    button.addEventListener('click', (e) => {


      console.log(e.currentTarget)
    })
  })



}
*/

function hideLoader() {
  loader.classList.add('is-hidden')
}



form.addEventListener('submit', (evt) => {

  loader.classList.remove('is-hidden')
  var inputText = input.value;
  /*
  document.addEventListener('scroll', scrollInfinite)
  */

  gallery.innerHTML = '';

  getPhoto(inputText, 1)
    .then(photos => makeList(photos, inputText))
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

/*
function removeScroll() {
  document.removeEventListener('scroll', scrollInfinite);

}



function scrollInfinite() {

  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {

    var inputText = input.value;

    page += 1;
    perPage <= 40;
    getPhoto(inputText).then((photos) => {
      if (photos.length === 0) {
        console.log(photos.length)
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
        removeScroll();
      } else {
        document.addEventListener('scroll', scrollInfinite)

        makeList(photos)



      }
    }
    )
  }



}

*/


