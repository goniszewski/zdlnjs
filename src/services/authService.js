const passportInstance = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = ({ app, env, usersService }) => {
  const accessTokenSecret = env.token.ACCESS_TOKEN_SECRET;

  app.use(passportInstance.initialize());

  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: accessTokenSecret,
  };

  passportInstance.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      await usersService.getUser(jwt_payload.email).then((res) => {
        if (!res || res.error) {
          return done(res.err, false);
        } else if (res.email) {
          return done(null, res);
        } else {
          return done(null, false);
        }
      });
    })
  );

  const passMatch = async (sended, fetched) => bcrypt.compare(sended, fetched);

  const generateToken = ({ email, expiresIn = env.token.EXPIRES_IN }) => {
    const payload = { email };

    const token = jwt.sign(payload, accessTokenSecret, {
      expiresIn,
    });

    return token;
  };

  const loginUser = async (email, password) => {
    const user = await usersService.getUser(email);

    if (!user) return env.responses.USER_DONT_EXISTS;

    const match = await passMatch(password, user.password);

    if (!match) return env.responses.WRONG_CREDENTIALS;

    const token = generateToken({ email });

    return { token };
  };

  const authenticate = passportInstance.authenticate("jwt", { session: false });

  return {
    passMatch,
    generateToken,
    loginUser,
    authenticate,
  };
};
