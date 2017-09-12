module.exports = {
  init(app) {
    const authRoutes = require('../routes/auth.routes');
    const userRoutes = require('../routes/user.routes');
    app.use('/auth', authRoutes);
    app.use('/user', userRoutes);
  }
};