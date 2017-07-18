module.exports = function createTokenInfo(user){
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    facebookId: user.facebookId,
    googleId: user.googleId
  };
};