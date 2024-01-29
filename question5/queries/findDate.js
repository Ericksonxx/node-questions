const { db } = require('../db');
const Table = require('cli-table');
const readLineSync = require('readline-sync');

const dateRangeQuery = async () => {
  try {
    const startDate = readLineSync.question('Enter start date (YYYYMMDD): ');
    const endDate = readLineSync.question('Enter end date (YYYYMMDD): ');
    const query = 'SELECT * FROM platereads WHERE Date BETWEEN ? AND ?';
    const [results] = await db.promise().query(query, [startDate, endDate]);

    if (results && results.length > 0) {
      const table = new Table({
        head: ['ID', 'Country', 'Reg Number', 'Confidence', 'Camera Name', 'Date', 'Time', 'Image Filename'],
        colWidths: [6, 12, 15, 12, 15, 10, 10, 40],
        style: { head: ['cyan'] },
      });

      results.forEach(row => {
        table.push([row.id, row.CountryOfVehicle, row.RegNumber, row.ConfidenceLevel, row.CameraName, row.Date, row.Time, row.ImageFilename]);
      });
      console.log(table.toString());
    } else {
      console.log('No entries found within the specified date range.');
    }
  } catch (error) {
    console.error('Error querying database:', error);
  }
};

module.exports = { dateRangeQuery };
