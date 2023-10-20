/**
 * This script performs Task 2, which involves reading product and order data from CSV files,
 * determining which customers bought which products, and writing the results to a new CSV file.
 *
 * Dependencies:
 * - CSV utility functions: `readCsv` and `writeCsv` from '../utils/csvUtils'.
 * - File paths: `ordersFilePath`, `productsFilePath`, `productCustomersFilePath` from '../utils/filePaths'.
 *
 * Steps:
 * 1. Read product and order data from CSV files.
 * 2. Process orders to determine which customers bought which products.
 * 3. Prepare data for a new CSV file, showing the relationship between products and customers.
 * 4. Write the results to a new CSV file (`productCustomersFilePath`).
 * 5. Log a success message or catch and log any errors.
 *
 * Usage:
 * Execute the script to perform Task 2 by running the command: `node task2.js`.
 *
 * Note: Ensure that CSV files and file paths are correctly set before execution.
 */

const {readCsv, writeCsv} = require('../utils/csvUtils');
const {ordersFilePath, productsFilePath, productCustomersFilePath} = require('../utils/filePaths');

// Create Task2 Function
async function task2() {
    // Handle Errors by using try and catch
    try {
        // Read CSV Files
        const products = await readCsv(productsFilePath);
        const orders = await readCsv(ordersFilePath);  

        // Calculate Product Customers
        const productCustomers = {};

        // Process Orders to Determine witch customers bought witch products
        orders.forEach((order) => {
            // Get Product IDs
            const productsIds = order.products.split(' ');
            
            // Foreach Product ID
            productsIds.forEach(productId => {
                // Initialize Product Customers
                if (!productCustomers[productId]) {
                    productCustomers[productId] = [];
                }

                // If Customer ID is not in Product Customers - Add It
                if (!productCustomers[productId].includes(order.customer)) {
                    productCustomers[productId].push(order.customer);
                }
            });
        });


        // Prepare Data for CSV File - Foreach Product, Get the Customer Who Purchased it
        const productCustomersData = products.map(product => {
            return {
                id: product.id,
                customer_ids: productCustomers[product.id] ? productCustomers[product.id].join(' ') : ''
            };
        });

        // Write Order Prices to CSV File
        await writeCsv(productCustomersFilePath, productCustomersData, [
            {id: 'id', title: 'id'},
            {id: 'customer_ids', title: 'customer_ids'},
        ]);

        // Console Log Success Message
        console.log('Task2 Completed Successfully!');

    } catch (error) {
        // Console Log error
        console.error('An Error has Occurred: ', error);
    }
}

// Execute Task2 Function
task2();