import mongoose from 'mongoose'
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_COMPASS)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.log(`Error: ${err.message}`)
    process.exit(1)
  }
}
