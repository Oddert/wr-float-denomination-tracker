import express, { Express } from 'express'
import path from 'path'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'

import coreRoutes from './routes/coreRoutes'
import authRoutes from './routes/authRoutes'
import repositoryRoutes from './routes/repositoryRoutes'
import countRoutes from './routes/countRoutes'
import userRoutes from './routes/userRoutes'

dotenv.config()

const app: Express = express()

const PORT: number | string = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, '../build')))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('tiny'))

app.use('/', coreRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/repository', repositoryRoutes)
app.use('/api/v1/count', countRoutes)
app.use('/api/v1/user', userRoutes)

const confirmStart: any = () => console.log(`${new Date().toLocaleTimeString()}: Server initialised on PORT ${PORT}`)

app.listen(PORT, confirmStart)