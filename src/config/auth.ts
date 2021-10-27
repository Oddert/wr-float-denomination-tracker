import passport from 'passport'
import * as passportLocal from 'passport-local'

import User from '../models/User'

import init from './passport'
import { comparePwd } from './authMethods'

const LocalStrategy = passportLocal.Strategy

const options = {}

init()

passport.use(new LocalStrategy(options, (username: string, password: string, done) => {
	User.query()
		.where({ username })
		.first()
		.then((user: User) => {
			if (!user) return done(null, false)
			if (comparePwd(password, user.password)) {
				return done(null, user)
			} else {
				return done(null, false)
			}
		})
		.catch((err) => done(err))
}))

export default passport