/**
 * This script performs Task 1, which involves reading customer and product data from CSV files,
 * calculating the total prices of orders, and writing the results to a new CSV file.
 *
 * Dependencies:
 * - CSV utility functions: `readCsv` and `writeCsv` from '../utils/csvUtils'.
 * - File paths: `customersFilePath`, `productsFilePath`, `ordersFilePath`, `orderPricesFilePath` from '../utils/filePaths'.
 *
 * Steps:
 * 1. Read product and order data from CSV files.
 * 2. Calculate total prices for each order based on product costs.
 * 3. Write the results to a new CSV file (`orderPricesFilePath`).
 * 4. Log a success message or catch and log any errors.
 *
 * Usage:
 * Execute the script to perform Task 1 by running the command: `node task1.js`.
 *
 * Note: Ensure that CSV files and file paths are correctly set before execution.
 */

const {readCsv, writeCsv} = require('../utils/csvUtils');
const {customersFilePath, productsFilePath, ordersFilePath, orderPricesFilePath} = require('../utils/filePaths');

// Create Task1 Function
async function task1() {
    // Handle Errors by using try and catch
    try {
        // Read CSV Files
        const products = await readCsv(productsFilePath);
        const orders = await readCsv(ordersFilePath);  

        // Calculate Order Total Prices
        const orderPrices = orders.map(order => {
            // Get Product IDs
            const productsIds = order.products.split(' ');
            // Calculate Total Cost
            const totalCost = productsIds.reduce((total, productId) => {
                const product = products.find(product => product.id === productId);
                return product ? total + parseFloat(product.cost) : total;
            }, 0);

            // Return Order Price
            return {
                id: order.id,
                euros: totalCost
            };
        });

        // Write Order Prices to CSV File
        await writeCsv(orderPricesFilePath, orderPrices, [
            {id: 'id', title: 'id'},
            {id: 'euros', title: 'euros'},
        ]);

        // Console Log Success Message
        console.log('Task1 Completed Successfully!');

    } catch (error) {
        // Console Log error
        console.error('An Error has Occurred: ', error);
    }
}

// Execute Task1 Function
task1();