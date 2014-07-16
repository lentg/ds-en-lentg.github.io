// Generated by CoffeeScript 1.7.1
'use strict';
var $, app, tags;

$ = function(id) {
  return document.getElementById(id);
};

tags = ['1W', '3W', '5W', '8W', '10W', '12W', '15W', '25W', 'PAR46', 'PAR64', 'PAR575', 'Flat PAR', 'INDOOR', 'OUTDOOR', 'FULL COLOR', 'SINGLE COLOR', 'Other'];

app = angular.module('daisy', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
  return $routeProvider.when('/', {
    templateUrl: '/views/home.html',
    controller: 'HomeCtrl'
  }).when('/lights', {
    templateUrl: '/views/lights.html',
    controller: 'LightsCtrl'
  }).when('/lights/:name', {
    templateUrl: '/views/lights.html',
    controller: 'LightsCtrl'
  }).when('/news', {
    templateUrl: '/views/news.html',
    controller: 'NewsCtrl'
  }).when('/about', {
    templateUrl: '/views/about.html',
    controller: 'AboutCtrl'
  }).otherwise({
    redirectTo: '/'
  });
});

app.directive('demo', function(Data) {
  return {
    link: function(scope, elm) {
      return elm.bind('click', function() {
        var _base;
        if (typeof (_base = scope.$$childHead).show === "function") {
          _base.show(null);
        }
        return scope.$apply();
      });
    }
  };
});

app.directive('x', function($location) {
  return {
    link: function(scope, elm) {
      var $li, $page;
      $page = $($location.path().split('/')[1]);
      if ($page != null) {
        $page.classList.add('active');
      }
      $li = elm.find('li');
      $li.bind('click', function() {
        $li.removeClass('active');
        this.classList.add('active');
        return scope.x = false;
      });
      return elm.find('a').eq(0).bind('click', function() {
        $li.removeClass('active');
        return scope.x = false;
      });
    }
  };
});

app.factory('Data', function($http) {
  var data, obj;
  obj = {};
  obj.tags = ['1W', '3W', '8W', '10W', '12W', '15W', '25W', 'Other', 'PAR46', 'PAR64', 'PAR575', 'Flat PAR', 'INDOOR', 'OUTDOOR', 'FULL COLOR', 'SINGLE COLOR'];
  obj.categorys = [
    {
      k: 'par',
      v: 'LED PAR'
    }, {
      k: 'city',
      v: 'City Color'
    }, {
      k: 'moving',
      v: 'Moving Heads'
    }, {
      k: 'washer',
      v: 'LED Wall Washer'
    }, {
      k: 'other',
      v: 'Other'
    }
  ];
  if (!store.get('data')) {
    $http.get('/js/lights.json').success(function(rs) {
      var cat, nums, tag, _i, _j, _len, _len1, _ref, _ref1;
      nums = {};
      _ref = obj.tags;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tag = _ref[_i];
        nums[tag] = 0;
      }
      _ref1 = obj.categorys;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        cat = _ref1[_j];
        nums[cat.k] = 0;
      }
      angular.forEach(rs, function(val) {
        var t, _k, _len2, _ref2, _results;
        nums[val.c] += 1;
        _ref2 = val.ts;
        _results = [];
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          t = _ref2[_k];
          _results.push(nums[t] += 1);
        }
        return _results;
      });
      obj.lights = rs;
      obj.nums = nums;
      return store.set('data', [rs, nums]);
    });
  } else {
    data = store.get('data');
    obj.lights = data[0];
    obj.nums = data[1];
  }
  return obj;
});

app.controller('HomeCtrl', function($scope, Data) {
  return console.log('home...');
});

app.controller('LightsCtrl', function($scope, $routeParams, $anchorScroll, Data) {
  var name;
  $scope.lights = Data.lights;
  $scope.categorys = Data.categorys;
  $scope.tags = Data.tags;
  $scope.nums = Data.nums;
  $scope.setCategory = function(category) {
    $anchorScroll();
    $scope.light = '';
    $scope.search = {
      c: category
    };
    return angular.forEach($scope.categorys, function(val) {
      if (val.k === category) {
        return $scope.title = val.v;
      }
    });
  };
  $scope.setMark = function(mk) {
    $anchorScroll();
    $scope.light = '';
    return $scope.search = {
      ms: mk
    };
  };
  $scope.setTag = function(tag) {
    $anchorScroll();
    $scope.light = '';
    $scope.search = {
      ts: tag
    };
    return $scope.title = "Tags: " + tag;
  };
  $scope.show = function(light) {
    $anchorScroll();
    $scope.search = {
      c: light != null ? light.c : void 0,
      ts: light != null ? light.ts : void 0
    };
    $scope.light = light;
    return $scope.title = light != null ? light.n : void 0;
  };
  $scope.send = function(message) {
    console.log(message);
    return $scope.message = '';
  };
  if (name = $routeParams.name) {
    return angular.forEach($scope.lights, function(val) {
      if (val.n === name) {
        return $scope.show(val);
      }
    });
  }
});

app.controller('NewsCtrl', function($scope) {
  return console.log('news...');
});

app.controller('AboutCtrl', function($scope, Data) {
  return console.log('about...');
});
