let fs = require('fs');
let request = require('request');

let downloadImage = (uri, filename, callback) => {
  return request.head(uri, (err, res, body) => {
    request(uri).pipe(fs.createWriteStream(filename))
      .on('close', callback);
  });
};


let iterateDownload = (category) => {
  for (let i = 0; i < 20; i++) {
    // Math.ceil(Math.random() * 1000)
    let domain    = 'lorempixel.com';
    // let domain    = 'loremflickr.com';
    let width     = 800;
    let height    = 600;
    let imageUrl  = `http://${domain}/${width}/${height}/${category}/?rand=${i}`;
    let directory = `./${category}-${width}x${height}`;
    let filename  = `${directory}/${category}-${width}x${height}-${i}.jpg`;

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    setTimeout(() => {
      downloadImage(imageUrl, filename, () => {
        console.log(`${filename} : Image has been saved.`);
      });
    }, 2000);
  }
}

let categories = [
  'abstract',
  'animals',
  'business',
  'cats',
  'city',
  'nightlife',
  'abstract',
  'fashion',
  'people',
  'transport',
  'nature',
  'sports',
  'food',
  'technics'
];

categories.forEach((category) => {
  iterateDownload(category);
});
