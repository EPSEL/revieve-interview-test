const fs = require('fs');
const csv = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');

// Create Async Function readCsv
async function readCsv(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
}

// Create Async Function writeCsv
async function writeCsv(filePath, data, header) {
    const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: header
    });

    await csvWriter.writeRecords(data);
}

// Export readCsv and writeCsv
module.exports = {
    readCsv,
    writeCsv
};
