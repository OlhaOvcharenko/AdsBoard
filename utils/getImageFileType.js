const fs = require('fs').promises;

const getImageFileType = async (image) => {
  try {
    const file = await fs.readFile(image.path, { encoding: null });
    const header = file.toString('hex', 0, 4);

    switch (header) {
      case '89504e47':
        return 'image/png';
      case '47494638':
        return 'image/gif';
      case 'ffd8ffe0':
      case 'ffd8ffe1':
      case 'ffd8ffe2':
      case 'ffd8ffe3':
      case 'ffd8ffe8':
        return 'image/jpeg';
      default:
        return 'unknown';
    }
  } catch (err) {
    console.error('Error reading file:', err);
    return 'unknown';
  }
};

module.exports = getImageFileType;