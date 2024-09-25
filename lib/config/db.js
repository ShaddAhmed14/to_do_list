import mongoose from "mongoose"

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://root:root@cluster0.ohlpe.mongodb.net/todo')
    console.log("DB Connected")
}