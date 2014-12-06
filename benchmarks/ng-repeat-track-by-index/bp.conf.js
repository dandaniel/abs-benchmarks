module.exports = function(config) {
  config.set({
    scripts: [{
      id: 'angular',
      src: 'angular.js'
    },
    {
      src: 'app.js',
    }]
  });
};
