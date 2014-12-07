var app = angular.module('benchmark', []);

app.config(function($compileProvider) {
  if ($compileProvider.debugInfoEnabled) {
    $compileProvider.debugInfoEnabled(false);
  }
});

app.controller('DataController', function($scope, $rootScope, $window) {
  var ctrl = this;
  $scope.digestDuration = '?';
  $scope.numberOfBindings = '?';
  $scope.numberOfWatches = '?';

  var item = "Sample item value";
  $scope.item = item;

  function randomizeString(item){
    return item.split('').sort(function(){return 0.5-Math.random()}).join('');
  }

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
        $scope.item = randomizeString(item);
        ctrl.benchmarkType = previousType;
      });
    }
  });

  bp.steps.push({
    name: '$apply',
    fn: function() {
      $rootScope.$apply(function(){
        $scope.item = randomizeString(item);
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
    { value: 'interpolation',
      label: 'interpolation'
    },
    { value: 'ngBind',
      label: 'ng bind'
    },
    { value: 'ngBindTemplate',
      label: 'ng bind template'
    }
  ]);

  $scope.variableStates = bp.variables.variables;
  ctrl.benchmarkType = bp.variables.selected? bp.variables.selected.value : undefined;
  setTimeout(function() {
    bp.runner.ready();
  });
});

var fn = function() { return 'x'};