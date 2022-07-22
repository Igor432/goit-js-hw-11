
const axios = require('axios').default;
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery')
const form = document.querySelector('.search-form');




async function getPhoto(name) {

  const photos = await axios.get(`https://pixabay.com/api/?key=28780636-ee20ed417c8a5aa1eeee48e35&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`);
  const photoList = photos.data.hits;

  const galleryList = photoList.map((photo) => {
    return `<div class="photo-card">
  <img src=${photo.webformatURL} alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${photo.likes}Likes</b>
    </p>
    <p class="info-item">
      <b>${photo.views}Views</b>
    </p>
    <p class="info-item">
      <b>${photo.comments}Comments</b>
    </p>
    <p class="info-item">
      <b>${photo.downloads}Downloads</b>
    </p>
  </div>
</div>`

  })
  gallery.innerHTML = galleryList;

}




form.addEventListener('submit', (evt) => {
  var inputText = input.value;
  getPhoto(inputText).then()


  evt.preventDefault();
  console.log('search done')
})




/*

  { webformatURL, largeImageURL, tags, likes, views, comments, downloads }

  */








