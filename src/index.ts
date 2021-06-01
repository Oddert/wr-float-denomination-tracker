import express, { Express, json, urlencoded } from 'express'
import session from 'express-session'
import flash from 'express-flash'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import Knex from 'knex'
import { Model } from 'objection'
import cookieParser from 'cookie-parser'
// import * as knex from 'knex'

import passport from './config/auth'
import config from './knexfile'

import coreRoutes from './routes/coreRoutes'
import authRoutes from './routes/authRoutes'
import countRoutes from './routes/countRoutes'
import floatRoutes from './routes/floatRoutes'
import partnerRoutes from './routes/partnerRoutes'
import repositoryRoutes from './routes/repositoryRoutes'
import userRoutes from './routes/userRoutes'

dotenv.config()

const app: Express = express()

const PORT: number | string = process.env.PORT || 5000

const knexConfig = Knex(config.development)

Model.knex(knexConfig)

app.use(express.static(path.join(__dirname, '../build')))
app.use(json())
app.use(cookieParser())
app.use(urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

app.use(session({
	secret: process.env.SECRET as string,
	resave: false,
	saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.get('/test', (req, res) => {
	const input = req.query.t
	res.json({
		raw: input,
		type: typeof input
	})
})
app.get('/test/badly', (req, res) => {
	const input = req.query.t
	res.status(500).json({
		raw: input,
		type: typeof input,
		responseMessage: `Something went wrong: raw=${input}, type=${typeof input}`
	})
})

app.use('/', coreRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/count', countRoutes)
app.use('/api/v1/float', floatRoutes)
app.use('/api/v1/partner', partnerRoutes)
app.use('/api/v1/repository', repositoryRoutes)
app.use('/api/v1/user', userRoutes)

const confirmMessage: string = `${new Date().toLocaleTimeString()}: Server initialised on PORT ${PORT}`
const confirmStart: () => void = () => console.log(confirmMessage)

const server = app.listen(PORT, confirmStart)
export default server