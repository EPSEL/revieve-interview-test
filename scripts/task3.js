/**
 * This script performs Task 3, which involves reading customer, product, and order data from CSV files,
 * calculating the total euros spent by each customer, and generating a customer ranking based on spending.
 *
 * Dependencies:
 * - CSV utility functions: `readCsv` and `writeCsv` from '../utils/csvUtils'.
 * - File paths: `customersFilePath`, `productsFilePath`, `ordersFilePath`, `customerRankingFilePath` from '../utils/filePaths'.
 *
 * Steps:
 * 1. Read customer, product, and order data from CSV files.
 * 2. Calculate the total euros spent by each customer by processing order data.
 * 3. Prepare data for a new CSV file, showing customer rankings based on total euros spent.
 * 4. Sort the customer ranking data in descending order of total euros spent.
 * 5. Write the results to a new CSV file (`customerRankingFilePath`).
 * 6. Log a success message or catch and log any errors.
 *
 * Usage:
 * Execute the script to perform Task 3 by running the command: `node task3.js`.
 *
 * Note: Ensure that CSV files and file paths are correctly set before execution.
 */

const {readCsv, writeCsv} = require('../utils/csvUtils');
const {customersFilePath, ordersFilePath, productsFilePath, customerRankingFilePath} = require('../utils/filePaths');

// Create Task3 Function
async function task3() {
    // Handle Errors by using try and catch
    try {
        // Read CSV Files
        const customers = await readCsv(customersFilePath);
        const products = await readCsv(productsFilePath);
        const orders = await readCsv(ordersFilePath);  

        // Calculate the total euros spent by each customer
        const customerTotalEuros = {};

        // Foreach Order
        orders.forEach((order) => {
            // Get Product IDs
            const productsIds = order.products.split(' ');
            // Calculate Total Cost
            const totalCost = productsIds.reduce((total, productId) => {
                const product = products.find(product => product.id === productId);
                return product ? total + parseFloat(product.cost) : total;
            }, 0);

            // Initialize Customer Total Euros
            if (!customerTotalEuros[order.customer]) {
                customerTotalEuros[order.customer] = 0;
            }

            // Add Total Cost to customer Total Euros
            customerTotalEuros[order.customer] += totalCost;
        });

        // Prepare Data for CSV File - Foreach Customer, Get the Total Euros Spent
        const customerRankingData = customers.map(customer => {
            return {
                id: customer.id,
                firstname: customer.firstname,
                lastname: customer.lastname,
                total_euros: customerTotalEuros[customer.id] ? customerTotalEuros[customer.id] : 0
            };
        });

        // Sort The data by Total Euros Spent in descending order
        customerRankingData.sort((a, b) => parseFloat(b.total_euros) - parseFloat(a.total_euros));

        // Write Order Prices to CSV File
        await writeCsv(customerRankingFilePath, customerRankingData, [
            {id: 'id', title: 'id'},
            {id: 'firstname', title: 'firstname'},
            {id: 'lastname', title: 'lastname'},
            {id: 'total_euros', title: 'total_euros'},
        ]);

        // Console Log Success Message
        console.log('Task3 Completed Successfully!');

    } catch (error) {
        // Console Log error
        console.error('An Error has Occurred: ', error);
    }
}

// Execute Task3 Function
task3();