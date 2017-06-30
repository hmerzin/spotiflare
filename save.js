const fs = require('fs');
const save = (file, json) => {
    fs.writeFile(file, `module.exports = ${JSON.stringify(json)}`, err => {
        
    });
}
module.exports = save;