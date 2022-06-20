'use strict';

const access_key = 'eU09o2RLHm-qGZhMrHzn-UGpQ7ztLPNWKZMUWSlZc-Y';

const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=20`;

const gallery = document.querySelector('.gallery');

let allImages;

const getImages = () => {
  fetch(random_photo_url)
    .then(res => res.json())
    .then(data => {
      allImages = data;
      makeImages(allImages);
    });
};

const makeImages = data => {
  console.log(data);
  data.forEach((item, index) => {
    console.log(item);
    let img = document.createElement('img');
    // img.src = item.urls.small;
    // img.className = 'gallery-img';
    // gallery.appendChild(img);
  });
};

getImages();
