/**
 * This script defines file paths for input and output CSV files related to customer, product, and order data processing.
 * 
 * Input Files:
 * - `customersFilePath`: Path to the customers CSV file.
 * - `productsFilePath`: Path to the products CSV file.
 * - `ordersFilePath`: Path to the orders CSV file.
 * 
 * Output Files:
 * - `orderPricesFilePath`: Path for the output order prices CSV file.
 * - `productCustomersFilePath`: Path for the output product customers CSV file.
 * - `customerRankingFilePath`: Path for the output customer ranking CSV file.
 * 
 * Example Usage:
 * 
 * const filePaths = require('./filePaths');
 * console.log('Customers File Path:', filePaths.customersFilePath);
 * console.log('Order Prices Output Path:', filePaths.orderPricesFilePath);
 * 
 * Note: Ensure the correct paths and file names before using these files in your data processing pipeline.
 */

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
