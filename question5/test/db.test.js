const { db } = require('../db');
const mysql = require('mysql2');
const assert = require('assert');

// Function to test the database connection
const testDatabaseConnection = async () => {
  try {
    // Establish the database connection
    await db.promise().query('SELECT 1');
    console.log('Database connection test passed.');
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    console.log('Database connection test failed.');
    process.exit(1); // Exit the process with an error code
  } finally {
    // Close the database connection
    db.end();
  }
};

// Run the database connection test
testDatabaseConnection();
