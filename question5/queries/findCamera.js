const { db } = require('../db');
const readLineSync = require('readline-sync');
const Table = require('cli-table');

// function to look up all entries for a camera
const lookupCameraEntries = async () => {
  try {
    const cameraUser = readLineSync.question('Enter camera name: ');

    const query = 'SELECT * FROM platereads WHERE CameraName = ?';
    const [results] = await db.promise().query(query, [cameraUser]);

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
      console.log(`No entries found for plate number ${cameraUser}`);
    }
  } catch (error) {
    console.error('Error looking up plate entries:', error);
  }
};

module.exports = { lookupCameraEntries };
