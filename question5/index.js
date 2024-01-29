const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const readLineSync = require('readline-sync');

const { db } = require('./db');
const { lookupPlateEntries } = require('./queries/findPlate.js')
const { lookupCameraEntries } = require('./queries/findCamera.js')
const { searchByCountry } = require('./queries/findCountry.js')
const { dateRangeQuery } = require('./queries/findDate.js');

// Function to process a single file
const processFile = (filePath, callback) => {
    fs.readFile(filePath, 'utf8', (err, fileContent) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            callback();
            return;
        }

        if (fileContent === undefined || fileContent === null) {
            console.error(`File content is undefined or null for file ${filePath}`);
            callback();
            return;
        }

        const filename = path.basename(filePath);
        const parts = fileContent.split(/\\|\r/);
        const cameraName = parts[3];

        db.query('SELECT * FROM processedfiles WHERE filename = ? AND camera_name = ?', [filename, cameraName], (selectProcessedErr, processedResults) => {
            if (selectProcessedErr) {
                console.error(`Error checking processed files for ${filename}:`, selectProcessedErr);
                callback();
                return;
            }

            if (processedResults.length === 0) {
                const insertQueryProcessedfiles = 'INSERT INTO processedfiles (filename, camera_name) VALUES (?, ?)';
                db.query(insertQueryProcessedfiles, [filename, cameraName], (insertProcessedErr) => {
                    if (insertProcessedErr) {
                        console.error(`Error inserting data into processedfiles for ${filename}:`, insertProcessedErr);
                        callback();
                        return;
                    }

                    const insertQueryPlatereads = 'INSERT INTO platereads (CountryOfVehicle, RegNumber, ConfidenceLevel, CameraName, Date, Time, ImageFilename) VALUES (?, ?, ?, ?, ?, ?, ?)';
                    const imageFilenameParts = parts.length > 6 ? parts[6].split('/') : [''];

                    const countryOfVehicle = parts[0];
                    const regNumber = parts[1];
                    const confidenceLevel = parts[2];
                    const date = parts[4];
                    const timeAndImageFilename = parts[5].split('/');
                    const time = timeAndImageFilename.length > 0 ? timeAndImageFilename[0] : '';
                    const imageFilename = timeAndImageFilename.length > 1 ? timeAndImageFilename[1] : '';

                    db.query(insertQueryPlatereads, [countryOfVehicle, regNumber, confidenceLevel, cameraName, date, time, imageFilename], (insertErr) => {
                        if (insertErr) {
                            console.error(`Error inserting data into platereads for ${filename}:`, insertErr);
                        }
                        callback();
                    });
                });
            } else {
                console.log(`${filename} for camera ${cameraName} is already processed.`);
                callback();
            }
        });
    });
};

// Function to process a directory
const processDirectory = (directoryPath, callback) => {
    fs.readdir(directoryPath, { withFileTypes: true }, (err, items) => {
        if (err) {
            console.error(`Error reading directory ${directoryPath}:`, err);
            callback();
            return;
        }

        let processedCount = 0;
        const totalItems = items.length;

        const checkCompletion = () => {
            processedCount++;
            if (processedCount === totalItems) {
                callback();
            }
        };

        items.forEach(item => {
            const itemPath = path.join(directoryPath, item.name);

            if (item.isDirectory()) {
                processDirectory(itemPath, checkCompletion);
            } else if (item.isFile()) {
                processFile(itemPath, checkCompletion);
            } else {
                checkCompletion();
            }
        });
    });
};

// Menu options
const menuOptions = {
    '1': lookupPlateEntries,
    '2': lookupCameraEntries,
    '3': searchByCountry,
    '4': dateRangeQuery,
    '0': () => console.log("Exiting..."),
};

// Main function to display the menu
const main = async () => {
    let userRes;
    while (userRes !== '0') {
        console.log("=============================================")
        console.log("                  MENU                       ")
        console.log("=============================================")
        console.log("1. Search Plate Number");
        console.log("2. Search Camera Entries");
        console.log("3. Search by Country");
        console.log("4. Search by Date Range");
        console.log("0. Exit");

        userRes = readLineSync.question("Pick an option: ");

        const selectedOption = menuOptions[userRes];
        if (selectedOption) {
            await selectedOption();
        } else {
            console.log("Invalid option. Please choose again.");
        }
    }
    db.end();
};

// Watch for changes in the 'data' directory
fs.watch('./data/', { recursive: true }, (event, filename) => {
    if (filename && event === 'change') {
        console.log('filename provided: ' + filename);
    } else {
        console.log('error tracking new file');
    }
});

main();

