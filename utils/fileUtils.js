const fs = require('fs');
const path = require('path');

function saveToFilePath(relativePath, data) {
    const outputPath = path.resolve(__dirname, relativePath);
    const dir = path.dirname(outputPath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, data);
    console.log(`File saved to ${outputPath}`);
}

module.exports = saveToFilePath;
