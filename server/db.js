import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

export async function connectDB() {
    try {
        const db = await mongoose.connect('mongodb+srv://cuevanaApi:cuevanaApipass@clustercueva.q0dkigr.mongodb.net/test')
        console.log('database connected' ,db.connection.name)
    } catch (error) {
        console.log(error)
    }
}
