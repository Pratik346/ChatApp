import mongoose from "mongoose";
//function to connect mongodb
export const connectDB=async()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log("Database Connected");
        });
        await mongoose.connect(`${process.env.DB_URL}`)
    } catch (error) {
        console.log(error);
    }
}