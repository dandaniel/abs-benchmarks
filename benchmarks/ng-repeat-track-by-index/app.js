var app = angular.module('benchmark', []);

app.config(function($compileProvider) {
  if ($compileProvider.debugInfoEnabled) {
    $compileProvider.debugInfoEnabled(false);
  }
});

app.controller('DataController', function($scope, $rootScope, $window) {
  var data = $scope.services = [];

  for(var i = 0; i<=1000; i++){
    data.push(i + ' | ' + Math.round(Math.random() * 1000));
  }

  var ctrl = this;
  $scope.digestDuration = '?';
  $scope.numberOfBindings = $scope.services.length;
  $scope.numberOfWatches = '?';

  var previousType;

  bp.steps.push({
    name: 'destroy',
    fn: function() {
      $scope.$apply(function() {
        previousType = ctrl.benchmarkType;
        ctrl.benchmarkType = 'none';
      });
    }
  });

  bp.steps.push({
    name: 'create',
    fn: function() {
      $scope.$apply(function() {
        ctrl.benchmarkType = previousType;
      });
    }
  });

  bp.steps.push({
    name: '$apply',
    fn: function() {
      $rootScope.$apply();
    }
  });

  $scope.$watch(function() {return ctrl.benchmarkType}, function(newVal, oldVal) {
    bp.variables.select(newVal);
  });

  bp.variables.addMany([
    {
      value: 'none',
      label: 'none'
    },
    { value: 'defaultRepeat',
      label: 'default repeat'
    },
    { value: 'trackByIndex',
      label: 'track by index'
    }
  ]);

  $scope.variableStates = bp.variables.variables;
  ctrl.benchmarkType = bp.variables.selected? bp.variables.selected.value : undefined;
  setTimeout(function() {
    bp.runner.ready();
  });
});

var fn = function() { return 'x'};