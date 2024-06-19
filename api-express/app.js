
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./queries.js');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('You made it!')
    }
);

app.get('/api/discounts', db.getDiscounts);
app.get('/api/products', db.getProducts);
app.post('/api/products', db.addProduct);
app.put('/api/products/:id', db.updateProduct);
app.delete('/api/products/:id', db.deleteProduct);

// app.get('/api/discounts', (req, res) => {
//     res.json(discountData.getDiscounts());
//     }
// );

// app.get('/api/products', (req, res) => {
//     res.json(productData.getProducts());
//     }
// );

// app.post('/api/products', (req, res) => {
//     const product = req.body;
//     res.json(productData.addProduct(product));
//     }
// );

// app.put('/api/products', (req, res) => {
//     const product = req.body;
//     res.json(productData.updateProduct(product));
//     }
// );

// app.delete('/api/products/:id', (req, res) => {
//     const id = req.params.id;
//     res.json(productData.deleteProduct(id));
//     }
// );

const listen = () => {
    app.listen(7071, () => {
        console.log('Server is running on port 7071');
    });
}

db.initializeDatabase(listen)