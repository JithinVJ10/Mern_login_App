const express = require('express')
const dotenv = require('dotenv')
const app = express()
const cookieParser = require('cookie-parser')
const connectDB = require('./config/database')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminUser')
const errorMidddleware = require('./middleware/errorMiddleware')


dotenv.config()
const port = process.env.PORT || 8000

// connect MongoDB
connectDB()

// body parser to get data from client
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use(cookieParser())

// User Route set
app.use('/api/users',userRoute)
app.use('/api/admin',adminRoute)

app.get('/', (req,res)=> res.send('Welcome to Home'))

app.use(errorMidddleware.notFound)
app.use(errorMidddleware.errorHandler)

app.listen(port,()=>console.log(`Server started on port ${port}`))