require('dotenv').config()
const Pool = require('pg').Pool

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

const selectProducts = `SELECT EXISTS (
SELECT * FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'products'
);`

const selectDiscounts = `SELECT EXISTS (
    SELECT * FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = 'discounts'
);`

// products - id, name, description, quantity
const createProducts = `CREATE TABLE products ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    quantity INT NOT NULL
);`

// discounts - id, store, percentage, code
const createDiscounts = `CREATE TABLE discounts (
    id SERIAL PRIMARY KEY,
    store VARCHAR(255) NOT NULL,
    percentage INT NOT NULL,
    code VARCHAR(255) NOT NULL
);`

const initializeDatabase = (callback) => {
    pool.query(selectProducts, (error, results) => {
        if (error) {
            console.log(`Failed to create products table: ${error}`)
            callback();
            return;
        }
        if (!results.rows[0].exists) {
            console.log('Creating products table')
            pool.query(createProducts, (error, results) => {
                if (error) {
                    console.log(error)
                    throw error
                }
            })
        } else {
            callback()
        }

    })
    pool.query(selectDiscounts, (error, results) => {
        if (error) {
            throw error
        }
        if (!results.rows[0].exists) {
            pool.query(createDiscounts, (error, results) => {
                if (error) {
                    throw error
                }
            })
        }
        callback()
    })
}

// get all products
const getProducts = (request, response) => {
    pool.query('SELECT * FROM products', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// get all discounts
const getDiscounts = (request, response) => {
    pool.query('SELECT * FROM discounts', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// add a new product
const addProduct = (request, response) => {
    const { name, description, quantity } = request.body

    pool.query('INSERT INTO products (name, description, quantity) VALUES ($1, $2, $3)', [name, description, quantity], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Product added with ID: ${results.insertId}`)
    })
}

// update a product
const updateProduct = (request, response) => {
    const { id, name, description, quantity } = request.body

    pool.query('UPDATE products SET name = $1, description = $2, quantity = $3 WHERE id = $4', [name, description, quantity, id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Product modified with ID: ${id}`)
    })
}

// delete a product
const deleteProduct = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM products WHERE ID = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Product deleted with ID: ${id}`)
    }
    )
}


module.exports = {
    initializeDatabase,
    getProducts,
    getDiscounts,
    addProduct,
    updateProduct,
    deleteProduct
}
