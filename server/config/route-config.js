(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const authRoutes = require('../routes/auth');

    // *** register routes *** //
    app.use('/auth', authRoutes);

  };

})(module.exports);