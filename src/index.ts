import express, { Express } from 'express'
import path from 'path'

import coreRoutes from './routes/coreRoutes'

const app: Express = express()

const PORT: number | string = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, '../build')))

app.use('/', coreRoutes)

const confirmStart: any = () => console.log(`${new Date().toLocaleTimeString()}: Server initialised on PORT ${PORT}`)

app.listen(PORT, confirmStart)