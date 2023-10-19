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