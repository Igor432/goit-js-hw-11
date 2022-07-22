
const axios = require('axios').default;
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery')
const form = document.querySelector('.search-form');

const photoList = [];


async function getPhoto(name) {

  const photos = await axios.get(`https://pixabay.com/api/?key=28780636-ee20ed417c8a5aa1eeee48e35&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`);
  photoList.push(photos.data.hits);
  console.log(photoList)

}


function makeList() {
  photoList.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    `<div class="photo-card">
  <img src=${webformatURL} alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}Likes</b>
    </p>
    <p class="info-item">
      <b>${views}Views</b>
    </p>
    <p class="info-item">
      <b>${comments}Comments</b>
    </p>
    <p class="info-item">
      <b>${downloads}Downloads</b>
    </p>
  </div>
</div>`
    gallery.innerHTML = photoList;


  })
}



form.addEventListener('submit', (evt) => {
  var inputText = input.value;
  getPhoto(inputText).then(photoList => makeList(photoList))
  evt.preventDefault();
  console.log('search done')
})




/*

  { webformatURL, largeImageURL, tags, likes, views, comments, downloads }

  */
