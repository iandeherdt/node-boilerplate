module.exports = {
  init(app) {
    const authRoutes = require('../routes/auth');
    app.use('/auth', authRoutes);
  }
};