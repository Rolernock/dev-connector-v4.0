import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import postRoutes from './routes/postRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import { connectDB } from './config/db.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT

// Resolving __dirname for ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//Body Parser Middleware
app.use(express.json())

//Cookie Parser Middleware
app.use(cookieParser())

//Defining Routes
app.use('/api/users', userRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/posts', postRoutes)

//Use the client app
app.use(express.static(path.join(__dirname, '/client/dist')))

//Render Client for any path
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))
)

//Error middlewares
app.use(notFound)
app.use(errorHandler)

//Db connection
connectDB()

app.listen(PORT, () => console.log(`Connected on port ${PORT}`))
