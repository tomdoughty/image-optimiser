
const fs = require('fs');
const sharp = require('sharp');

// Input and output directories
const input = './input';
const output = './output';

// Optimisation settings
const quality = 90;
const width = 90;

// Read contents of input directory
fs.readdir(input, (_, files) => {
  // Loop through contents
  files.forEach((file) => {
    // Call optimiseFile function
    optimiseFile(file);
  });
});

// Takes a filename and optimises that file within the input directory
const optimiseFile = (file) => {

  // Filename minus the extension
  const name = file.split('.').slice(0, -1).join('.');
  // File extension
  const extension = file.split('.').pop();

  // Create stream instance of image
  const sharpStream = sharp(`${input}/${file}`);
  
  // Array of promises which will be run on image
  const promises = [];

  // Create jpg if input file is jpg
  if (extension === 'jpg') {
    promises.push(
      sharpStream
        .clone()
        .resize({ width })
        .jpeg({ quality })
        .toFile(`${output}/${file}`)
    )
  } 
  
  // Create png if input file is png
  if (extension === 'png') {
    promises.push(
      sharpStream
        .clone()
        .resize({ width })
        .png({ quality })
        .toFile(`${output}/${file}`)
    )
  }

  // Create Webp image
  promises.push(
    sharpStream
      .clone()
      .resize({ width })
      .webp({ quality })
      .toFile(`${output}/${name}.webp`)
  )

  // Run promises
  Promise.all(promises);
};
