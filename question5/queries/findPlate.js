const { db } = require('../db');
const readLineSync = require('readline-sync');
const Table = require('cli-table');

// look up all entries for a specific plate
const lookupPlateEntries = async () => {
  try {
    const userPlate = readLineSync.question('Enter a plate number: ');

    const query = 'SELECT * FROM platereads WHERE RegNumber = ?';
    const [results] = await db.promise().query(query, [userPlate]);

    if (results && results.length > 0) {
      // Create a new table
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
      console.log(`No entries found for plate number ${userPlate}`);
    }
  } catch (error) {
    console.error('Error looking up plate entries:', error);
  }
};

module.exports = { lookupPlateEntries };
