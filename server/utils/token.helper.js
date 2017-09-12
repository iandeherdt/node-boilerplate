const jwt = require('jsonwebtoken');

function createTokenInfo(user){
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    facebookId: user.facebookId,
    googleId: user.googleId
  };
}

module.exports = {
  createAccessToken(user){
    const userInfo = createTokenInfo(user);
    return jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '12h' });
  }
};