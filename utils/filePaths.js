const path = require('path');

// Input Files
const customersFilePath = path.join(__dirname, '../data/customers.csv');
const productsFilePath = path.join(__dirname, '../data/products.csv');
const ordersFilePath = path.join(__dirname, '../data/orders.csv');

// Output Files
const orderPricesFilePath = path.join(__dirname, '../output/order_prices.csv');
const productCustomersFilePath = path.join(__dirname, '../output/product_customers.csv');
const customerRankingFilePath = path.join(__dirname, '../output/customer_ranking.csv');

// Export Files
module.exports = {
    customersFilePath,
    productsFilePath,
    ordersFilePath,
    orderPricesFilePath,
    productCustomersFilePath,
    customerRankingFilePath,
};
