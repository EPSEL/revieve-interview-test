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