// const mongoose = require('mongoose');

//  export const connectDB = async () => {
//     (await mongoose.connect('mongodb+srv://ayshaharis432:9633252213@cluster0.oh2rt.mongodb.net/food-del')).isObjectIdOrHexString(()=>console.log("DB connected"))
// }

// import mongoose from 'mongoose';


// const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://ayshaharis432:9633252213@cluster0.oh2rt.mongodb.net/food-del', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("DB connected");
//     } catch (error) {
//         console.error("DB connection error:", error);
//         process.exit(1); // Exit process with failure
//     }
// }

// module.exports = { connectDB };

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ayshaharis432:9633252213@cluster0.oh2rt.mongodb.net/food-del', {
        });
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

export { connectDB };

