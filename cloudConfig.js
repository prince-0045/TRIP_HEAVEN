const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Add debug logging
console.log('=== DEBUG: Cloudinary Config ===');
console.log('CLOUD_NAME:', process.env.CLOUD_NAME);
console.log('CLOUD_API_KEY:', process.env.CLOUD_API_KEY ? '***SET***' : 'NOT SET');
console.log('CLOUD_API_SECRET:', process.env.CLOUD_API_SECRET ? '***SET***' : 'NOT SET');
console.log('==============================');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'triphaven_DEV',
      allowedFormats: ['jpeg', 'png', 'jpg'],
    },
});

module.exports = {
    cloudinary,
    storage,
}