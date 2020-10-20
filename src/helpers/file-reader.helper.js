const fs = require('fs');
const path = require('path');
const inputProcessor = require('./input-processor.helper')

const fileReader = {}

fileReader.readFile = () => {
    const filePath = path.join(process.cwd(), '/data/data.txt');
    fs.readFile(filePath, 'utf8', (err, daysWorkedData) => {
        inputProcessor.processInput(daysWorkedData);
    });
}

module.exports = fileReader;
