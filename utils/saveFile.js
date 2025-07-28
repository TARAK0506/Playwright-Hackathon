

function saveToFile(data, filename = 'results.json', dirPath = '../data') {
    try {
        const outputPath = path.resolve(__dirname, `${dirPath}/${filename}`);
        const dir = path.dirname(outputPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log(`Data saved to ${outputPath}`);
        return true;
    } catch (err) {
        console.error(`Failed to save data: ${err.message}`);
        return false;
    }
}

module.exports = saveToFile;



