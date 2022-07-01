'use strict';

const access_key = 'eU09o2RLHm-qGZhMrHzn-UGpQ7ztLPNWKZMUWSlZc-Y';
const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=50`;
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.preloader');
const imageDesc = document.querySelector('.image-description');

let currentImg = 0;
let allImages;
let searchPhoto = location.search.split('=').pop();
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchPhoto}&per_page=50`;

function initLoadingImages() {
  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.display = 'none';
    gallery.style.display = 'block';
    setTimeout(() => (gallery.style.opacity = 1), 50);
  }, 1500);
}

const getImages = () => {
  fetch(random_photo_url)
    .then(res => res.json())
    .then(data => {
      allImages = data;
      makeImages(allImages);
    });
};

const searchImages = () => {
  fetch(search_photo_url)
    .then(res => res.json())
    .then(data => {
      allImages = data.results;
      console.log(data.results);
      makeImages(allImages);
    });
};

const imageSourceAndAlt = (img, item) => {
  img.src = item.urls.regular;
  if (item.description !== null) {
    img.alt = item.description;
  } else {
    img.alt = 'Unsplash image';
  }
};

const makeImages = data => {
  data.forEach((item, index) => {
    let img = document.createElement('img');
    imageSourceAndAlt(img, item);
    img.className = 'gallery-img';
    gallery.appendChild(img);
    img.addEventListener('click', function () {
      currentImg = index;
      showPopUp(item);
    });
  });
};

const imageDescription = (item, imageD) => {
  let htmlEl = `
  <p class="desc-img">
    <ion-icon name="download-outline"></ion-icon>Downloads: ${item.downloads}
  </p>
  <p class="desc-img">
    <ion-icon name="heart-dislike-outline"></ion-icon>Likes: ${item.likes}
  </p>
  <p class="desc-img">
    <ion-icon name="person-outline"></ion-icon>Username: ${item.user.username}
  </p>
  <p class="desc-img">
    <ion-icon name="person-circle-outline"></ion-icon>Name: ${item.user.name}
  </p>
  <p class="desc-img">
    <ion-icon name="link-outline"></ion-icon>Portfolio URL:
    <a class="img-link-portfolio" href="${item.user.portfolio_url}"> ${item.user.name}'s portfolio</a>
  </p>`;
  imageD.insertAdjacentHTML('beforeend', htmlEl);
};

const showPopUp = data => {
  let overlay = document.querySelector('.overlay');
  let popup = document.querySelector('.screen-popup');
  const downloadBtn = document.querySelector('.download-btn');
  const closeBtn = document.querySelector('.close-btn');
  const image = document.querySelector('.open-img');

  overlay.classList.remove('hidden');
  popup.classList.remove('hidden');
  downloadBtn.href = data.links.html;
  imageSourceAndAlt(image, data);
  imageDescription(data, imageDesc);

  closeBtn.addEventListener('click', function () {
    overlay.classList.add('hidden');
    popup.classList.add('hidden');
    imageDesc.innerHTML = '';
  });
};

const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

leftArrow.addEventListener('click', function () {
  if (currentImg > 0) {
    currentImg--;
    showPopUp(allImages[currentImg]);
    imageDesc.innerHTML = '';
    imageDescription(allImages[currentImg], imageDesc);
  }
});

rightArrow.addEventListener('click', function () {
  if (currentImg < allImages.length - 1) {
    currentImg++;
    showPopUp(allImages[currentImg]);
    imageDesc.innerHTML = '';
    imageDescription(allImages[currentImg], imageDesc);
  }
});

const initImages = () => {
  if (searchPhoto == '') {
    getImages();
  } else {
    searchImages();
  }
};

initLoadingImages();
initImages();

window.addEventListener('scroll', () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    initImages();
  }
});
