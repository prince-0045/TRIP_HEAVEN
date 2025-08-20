// const mongoose = require('mongoose');
// const initData = require('./data');
// const Listing = require('../models/listing');
// const User = require('../models/user');

// // Use environment variable for MongoDB connection
// const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/triphaven';

// main().then(() => {
//     console.log("connected to db");
// }).catch((err) => {
//     console.log(err);
// });

// async function main() {
//     await mongoose.connect(MONGO_URL)
// };

// const init = async () => {
//     try {
//         // First, create a default user for the sample listings
//         let defaultUser = await User.findOne({ email: 'admin@triphaven.com' });
        
//         if (!defaultUser) {
//             defaultUser = new User({
//                 email: 'admin@triphaven.com',
//                 username: 'admin',
//                 password: 'admin123' // You can change this password
//             });
//             await defaultUser.save();
//             console.log("✅ Default user created:", defaultUser.username);
//         } else {
//             console.log("✅ Default user already exists:", defaultUser.username);
//         }

//         // Clear existing listings
//         await Listing.deleteMany({});
//         console.log("🗑️ Existing listings cleared");
        
//         // Add sample listings with the default user as owner
//         const sampleListingsWithOwner = initData.data.map((obj) => ({
//             ...obj, 
//             owner: defaultUser._id
//         }));
        
//         await Listing.insertMany(sampleListingsWithOwner);
//         console.log("✅ Sample data initialized successfully!");
//         console.log(`📊 ${sampleListingsWithOwner.length} listings added to database`);
//         console.log(`👤 All listings owned by: ${defaultUser.username}`);
        
//     } catch (error) {
//         console.error("❌ Error initializing data:", error);
//     }
// };

// init();
require('dotenv').config(); // Load env variables
const mongoose = require('mongoose');
const initData = require('./data');
const Listing = require('../models/listing');
const User = require('../models/user');

// Use MongoDB Atlas URL from environment variable
const MONGO_URL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/triphaven';

async function main() {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); // stop if DB fails
    }
}

const init = async () => {
    try {
        // Create a default user
        let defaultUser = await User.findOne({ email: 'admin@triphaven.com' });
        
        if (!defaultUser) {
            defaultUser = new User({
                email: 'admin@triphaven.com',
                username: 'admin',
                password: 'admin123' // ⚠️ Change this in production!
            });
            await defaultUser.save();
            console.log("👤 Default user created:", defaultUser.username);
        } else {
            console.log("👤 Default user already exists:", defaultUser.username);
        }

        // Clear existing listings
        await Listing.deleteMany({});
        console.log("🗑️ Existing listings cleared");

        // Add sample listings linked to default user
        const sampleListingsWithOwner = initData.data.map((obj) => ({
            ...obj,
            owner: defaultUser._id
        }));

        await Listing.insertMany(sampleListingsWithOwner);
        console.log("✅ Sample data initialized successfully!");
        console.log(`📊 ${sampleListingsWithOwner.length} listings added`);
        console.log(`👤 Listings owned by: ${defaultUser.username}`);

    } catch (error) {
        console.error("❌ Error initializing data:", error);
    } finally {
        mongoose.connection.close(); // Close DB after seeding
    }
};

// Run main connection then init
main().then(init);
