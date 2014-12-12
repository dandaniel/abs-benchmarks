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

  var data = {
    "id": "quick-pot",
    "name": "QuickPot",
    "address": {
      "city": "Aarhus C",
      "street": "Trindsøvej 5",
      "postcode": "8000",
      "country": "Denmark"
    },
    "contact": {
      "email": "8000@quickpot.dk",
      "phone": "86 15 85 44"
    }
  };

  var otherData = {
    "id": "beni-auto",
    "name": "Beni Auto",
    "address": {
      "city": "Aarhus N",
      "street": "Brendstrupvej 46",
      "postcode": 8200,
      "country": "Denmark"
    },
    "contact": {
      "email": "beni-auto@post.tele.dk",
      "phone": "40 45 15 16"
    }
  };

  var switcher = false;
  $scope.data = data;

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
      $rootScope.$apply(function(){
        switcher = !switcher;

        if(switcher){
          $scope.data = otherData;
        }
        else{
          $scope.data = data;
        }
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
    {
      value: 'interpolation',
      label: 'interpolation'
    },
    {
      value: 'ngBind',
      label: 'ng bind'
    },
    {
      value: 'ngBindOnce',
      label: 'ng bind once'
    }
  ]);

  $scope.variableStates = bp.variables.variables;
  ctrl.benchmarkType = bp.variables.selected? bp.variables.selected.value : undefined;
  setTimeout(function() {
    bp.runner.ready();
  });
});

var fn = function() { return 'x'};