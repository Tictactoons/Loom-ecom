import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://isaiah:Teamy123&@cluster0.tsqima7.mongodb.net/foodecommerce').then(() => console.log("DB Connected"))
}