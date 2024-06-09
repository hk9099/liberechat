const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { logger } = require('~/config');
const User = require('~/models/User');

// JWT strategy
const jwtLogin = async () =>
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '16f8c0ef4a5d391b26034086c628469d3f9f497f08163ab9b40137092f2909ef',
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload?.id);
        if (user) {
          done(null, user);
        } else {
          logger.warn('[jwtLogin] JwtStrategy => no user found: ' + payload?.id);
          done(null, false);
        }
      } catch (err) {
        done(err, false);
      }
    },
  );

module.exports = jwtLogin;
