import mongoose from "mongoose"


const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Mongodb Connection Details : ${conn.connection.host}`)
    } catch (error) {
      return console.log(`Error:${error.message}`)
    }
}


export default connectDB