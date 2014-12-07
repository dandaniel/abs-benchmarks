var app = angular.module('benchmark', []);

app.config(function($compileProvider) {
  if ($compileProvider.debugInfoEnabled) {
    $compileProvider.debugInfoEnabled(false);
  }
});

app.controller('DataController', function($scope, $rootScope, $window, $filter) {
  var ctrl = this;
  $scope.digestDuration = '?';
  $scope.numberOfBindings = '?';
  $scope.numberOfWatches = '?';

  var localCurrentDate = $scope.inlineCurrentDate = new Date();
  $scope.currentDate = $filter('date')(localCurrentDate, 'medium');

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
        var newDate = $scope.inlineCurrentDate = new Date();
        $scope.currentDate = $filter('date')(newDate, 'medium');
        ctrl.benchmarkType = previousType;
      });
    }
  });

  bp.steps.push({
    name: '$apply',
    fn: function() {
      $rootScope.$apply(function (){
        var newDate = $scope.inlineCurrentDate = new Date();
        $scope.currentDate = $filter('date')(newDate, 'medium');
        $scope.inlineCurrentDate = new Date();
      });
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
    { value: 'inlineFilter',
      label: 'inline filter'
    },
    { value: 'controllerFilter',
      label: 'controller filter'
    }
  ]);

  $scope.variableStates = bp.variables.variables;
  ctrl.benchmarkType = bp.variables.selected? bp.variables.selected.value : undefined;
  setTimeout(function() {
    bp.runner.ready();
  });
});

var fn = function() { return 'x'};