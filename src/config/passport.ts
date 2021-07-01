import passport from 'passport'
import User from '../models/User'

export default function () {

	passport.serializeUser((user, done) => {
		// @ts-ignore
		done(null, user.id)
	})

	passport.deserializeUser((id, done) => {
		User.query().where({ id }).first()
			.then((user: User) => {
				done(null, user)
			})
			.catch((err) => {
				done(err, null)
			})
	})

}