const passport = require("passport");
const twitterStrategy = require("passport-twitter").Strategy;
const consumerKey = require("./keys").consumerKey;
const consumerSecret = require("./keys").consumerSecret;
const User = require("../models/User");

const url = require("./keys").baseClientURL;

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
	done(null, user.id);
});
// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		})
		.catch(e => {
			done(new Error("Failed to deserialize an user"));
		});
});

passport.use(
	new twitterStrategy(
		{
			consumerKey,
			consumerSecret,
			callbackURL: `${url}/auth/twitter/callback`,
			userProfileURL:
				"https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
		},
		async (token, tokenSecret, profile, done) => {
			//認証通過後の処理はここに書く

			const { displayName, emails, photos, id, provider } = profile;
			//twitterに登録済みか確認
			const twitterUser = await User.findOne({
				email: emails[0].value,
				provider: { authId: id }
			});
			//もし見つかれば終了
			if (twitterUser) {
				done(null, twitterUser);
			}
			//登録済みのアドレスだがまだtwitter登録されていないユーザーの場合
			let existedUser = await User.findOne({ email: emails[0].value });
			if (existedUser) {
				existedUser.provider = {
					authId: id,
					authType: provider,
					token,
					tokenSecret
				};
				await existedUser.save();
				done(null, existedUser);
			}

			const newUser = new User({
				username: displayName,
				email: emails[0].value,
				imageUrl: photos[0].value,
				provider: {
					authId: id,
					authType: provider,
					token,
					tokenSecret
				}
			});
			await newUser.save();
			done(null, newUser);
		}
	)
);
