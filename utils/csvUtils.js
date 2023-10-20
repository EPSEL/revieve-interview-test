/**
 * This script provides two asynchronous functions, readCsv and writeCsv, to handle CSV file operations.
 *
 * - `readCsv`: Reads data from a CSV file and returns a promise with the parsed results.
 *
 * - `writeCsv`: Writes data to a CSV file using the provided header and data, utilizing the csv-writer library.
 *
 * Example Usage:
 *
 * const { readCsv, writeCsv } = require('./csvHandler');
 *
 * // Reading CSV
 * const data = await readCsv('input.csv');
 * console.log('Read CSV Data:', data);
 *
 * // Writing CSV
 * const header = ['Column1', 'Column2', 'Column3'];
 * const newData = [{ Column1: 'Value1', Column2: 'Value2', Column3: 'Value3' }];
 * await writeCsv('output.csv', newData, header);
 * console.log('CSV Written Successfully!');
 */

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
