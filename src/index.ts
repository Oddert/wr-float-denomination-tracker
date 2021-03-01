import express, { Express } from 'express'
import path from 'path'

import coreRoutes from './routes/coreRoutes'
import authRoutes from './routes/authRoutes'
import repositoryRoutes from './routes/repositoryRoutes'
import countRoutes from './routes/countRoutes'
import userRoutes from './routes/userRoutes'

const app: Express = express()

const PORT: number | string = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, '../build')))

app.use('/', coreRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/repository', repositoryRoutes)
app.use('/api/v1/count', countRoutes)
app.use('/api/v1/user', userRoutes)

const confirmStart: any = () => console.log(`${new Date().toLocaleTimeString()}: Server initialised on PORT ${PORT}`)

app.listen(PORT, confirmStart)