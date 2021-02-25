const fs = require('fs');

const filename = './database/data.json';

const saveJsonFile = (data) => {
    fs.writeFileSync(filename, JSON.stringify(data));
}

const readJsonFile = () => {
    if (!fs.existsSync(filename)) {
        return null; 
    }

    const info = fs.readFileSync(filename, { encoding: 'UTF-8'});

    return JSON.parse(info);
}

module.exports = { saveJsonFile, readJsonFile };