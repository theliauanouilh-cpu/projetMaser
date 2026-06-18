import { defineSsrMiddleware } from '#q-app/wrappers'
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import products from '../../data/products.json'
import fs from 'node:fs';
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/developing-ssr/ssr-middleware
export default defineSsrMiddleware(({ app /*, resolveUrlPath, publicPath, render */ }) => {
  app.get('/api/getProducts', function (req, res) {
    res.json(products)
  })

  app.post('/api/addProduct', function (req, res) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const parent = resolve(__dirname, '../../')
    console.log(req.body, parent)

    products.push(req.body)

    // WARNING : This overwrites the actual products.json file
    // INFO : https://nodejs.org/learn/manipulating-files/writing-files-with-nodejs
    fs.writeFile(`${parent}/data/test.json`, JSON.stringify(products), err => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });

    res.json(products)
  })
})
