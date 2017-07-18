module.exports = {
  init(app) {
    const authRoutes = require('../routes/auth');
    const userRoutes = require('../routes/user');
    app.use('/auth', authRoutes);
    app.use('/user', userRoutes);
    
  }
};