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