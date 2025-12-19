import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      const conn = await mongoose.connect(process.env.MONGODB_URI)
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } else {
      console.log('No MONGODB_URI provided, running without database')
    }
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    console.log('App will continue without database for now')
    // Don't exit - let app run without DB for testing
  }
}

export default connectDB