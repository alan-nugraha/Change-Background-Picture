const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

function edit_foto(img, bg_color) {
  const formData = new FormData();
  formData.append('size', 'auto');
  formData.append('image_file', fs.createReadStream(img), path.basename(img));
  formData.append('bg_color', bg_color);

  let headers = {
    ...formData.getHeaders(),
    'X-API-Key': process.env.API_KEY,
  };

  axios
    .post(process.env.API_URL, formData, {
      headers,
      encoding: null,
      responseType: 'arraybuffer',
    })
    .then((response) => {
      if (response.status != 200) {
        return console.error('Error:', response.status, response.statusText);
      }
      fs.writeFileSync('./output/edit.png', response.data);
      console.log(response.statusText);
    })
    .catch((error) => {
      return console.error('Request failed:', error);
    });
}

edit_foto('./images/photo.jpeg', 'red');
