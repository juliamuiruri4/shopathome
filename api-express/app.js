// write an api for the following actions, referencing sample data from discount-data.js and product-data.js from shared folder
// discounts get
// products get, delete, post, put

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const productData = require('./shared/product-data');
const discountData = require('./shared/discount-data');

// const db = require('.queries.js');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('You made it!')
    }
);

app.get('/api/discounts', (req, res) => {
    res.json(discountData.getDiscounts());
    }
);

app.get('/api/products', (req, res) => {
    res.json(productData.getProducts());
    }
);

app.post('/api/products', (req, res) => {
    const product = req.body;
    res.json(productData.addProduct(product));
    }
);

app.put('/api/products', (req, res) => {
    const product = req.body;
    res.json(productData.updateProduct(product));
    }
);

app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    res.json(productData.deleteProduct(id));
    }
);

app.listen(7071, () => {
    console.log('Server is running on port 7071');
    }
);



