const { db } = require('../db');
const readLineSync = require('readline-sync');
const Table = require('cli-table');

// Function to retrieve a list of all unique countries in the database
const getAllCountries = async () => {
  try {
    const query = 'SELECT DISTINCT CountryOfVehicle FROM platereads';
    const [results] = await db.promise().query(query);

    return results.map(row => row.CountryOfVehicle);
  } catch (error) {
    console.error('Error retrieving countries:', error);
    return [];
  }
};

// Function to search entries by country and display a menu
const searchByCountry = async () => {
  try {
    const countries = await getAllCountries();

    if (countries.length === 0) {
      console.log('No countries found in the database.');
      return;
    }

    console.log('============================')
    console.log('|   Available countries    |')
    console.log('============================')
    countries.forEach((country, index) => {
      console.log(`    ${index + 1}. ${country}   `);
    });

    const userChoice = readLineSync.questionInt('Enter the number corresponding to the country: ');

    if (userChoice >= 1 && userChoice <= countries.length) {
      const selectedCountry = countries[userChoice - 1];

      const query = 'SELECT * FROM platereads WHERE CountryOfVehicle = ?';
      const [results] = await db.promise().query(query, [selectedCountry]);

      if (results && results.length > 0) {
        // Create a new table
        const table = new Table({
          head: ['ID', 'Country', 'Reg Number', 'Confidence', 'Camera Name', 'Date', 'Time', 'Image Filename'],
          colWidths: [6, 12, 15, 12, 15, 10, 10, 40],
          style: { head: ['cyan'] },
        });

        // Push rows to the table
        results.forEach(row => {
          table.push([row.id, row.CountryOfVehicle, row.RegNumber, row.ConfidenceLevel, row.CameraName, row.Date, row.Time, row.ImageFilename]);
        });

        // Display the table
        console.log(table.toString());
      } else {
        console.log(`No entries found for country ${selectedCountry}`);
      }
    } else {
      console.log('Invalid choice. Please enter a valid number.');
    }
  } catch (error) {
    console.error('Error searching by country:', error);
  }
};

module.exports = { searchByCountry };
