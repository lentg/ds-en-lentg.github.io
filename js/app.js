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

app.directive('ngClear', function($window) {
  return {
    link: function(scope, elm) {
      return elm.bind('click', function() {
        store.clear();
        return $window.location.href = '/';
      });
    }
  };
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
  obj.marks = {
    s3: 'RGB',
    s4: 'RGBA/W',
    s5: 'RGBAW',
    m2: 'WW 2-IN-1',
    m3: '3-IN-1',
    m4: '4-IN-1',
    m5: '5-IN-1',
    m6: '6-IN-1',
    ip20: 'IP20',
    ip65: 'IP65',
    ip67: 'IP67',
    sd: 'Sound Activation',
    wl: 'Wireless',
    dmx: 'DMX 512',
    auto: 'Auto Programs',
    flick: 'Flicker Free',
    charge: 'Rechargeable',
    live: 'LIVE',
    cast: 'Flight Cast',
    disco: 'Disco'
  };
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

app.controller('HomeCtrl', function($scope, $location, Data) {
  $scope.tops = ['ct80', 'PS1212', 'LF2512', 'AWS1209', 'ML140-BEAM', 'PF1012'];
  $scope.says = [
    {
      who: 'Mr. Klaus',
      hi: 'One of Germany customer, said: We import products from your company for more than 6 years already because you never disappoint us on quality and delivery time.'
    }, {
      who: 'Mr. Stephen',
      hi: 'One of USA customer, said: I buy goods from China many years but I never meet any company like your company efficient. Every email I sent will be detailed reply by you within 10 minutes. Always I can get information from you in time.'
    }, {
      who: 'Mr. Hong',
      hi: 'One of South Korea customer, said: you save many times for me because I almost have not got complain from my customers again since we import Cases from your company.'
    }, {
      who: 'Miss Anita',
      hi: 'One of Spain customer, said: 2 years ago, we were a new company and do not know products and market very well. But you still support us and help us to develop market. You are our the best partner in China!'
    }, {
      who: 'Mr. Sveta',
      hi: 'From Russia company, said: I can keep strong competitiveness in big Russia market these years because of your good quality and competitive price. Could you please do not sell the goods to another Russia company for to keep our company competitive?'
    }
  ];
  return $scope.$on('$routeChangeStart', function(next, current) {
    var page;
    page = $location.path();
    if (page.indexOf('/lights') > -1) {
      return $('lights').classList.add('active');
    }
  });
});

app.controller('LightsCtrl', function($scope, $routeParams, $anchorScroll, Data) {
  var name;
  $scope.lights = Data.lights;
  $scope.marks = Data.marks;
  $scope.categorys = Data.categorys;
  $scope.tags = Data.tags;
  $scope.nums = Data.nums;
  $scope.setCategory = function(category) {
    $scope.xx = false;
    $anchorScroll();
    $scope.light = '';
    $scope.search = {
      c: category
    };
    $scope.title = 'All Lights';
    return angular.forEach($scope.categorys, function(val) {
      if (val.k === category) {
        return $scope.title = val.v;
      }
    });
  };
  $scope.setMark = function(mk) {
    $anchorScroll();
    $scope.light = '';
    $scope.search = {
      ms: mk
    };
    return $scope.title = "Marks: " + $scope.marks[mk];
  };
  $scope.setTag = function(tag) {
    $anchorScroll();
    $scope.light = '';
    $scope.search = {
      ts: tag
    };
    return $scope.title = "Tags: " + tag;
  };
  $scope.show = function(light, index) {
    $anchorScroll();
    $scope.message = {};
    $scope.search = {
      c: light != null ? light.c : void 0,
      ts: light != null ? light.ts : void 0
    };
    $scope.light = light;
    $scope.title = light != null ? light.n : void 0;
    $scope.relateds = (angular.copy($scope.lights).sort(function() {
      return 0.5 - Math.random();
    })).slice(0, 4);
    return $scope.send = function(message) {
      console.log(message);
      return $scope.message.content = '';
    };
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
  return $scope.slides = [
    {
      img: 1,
      desc: 'The workshop'
    }, {
      img: 3,
      desc: 'Single chip microcomputer'
    }, {
      img: 5,
      desc: 'Single chip microcomputer'
    }, {
      img: 6,
      desc: 'Single chip microcomputer'
    }, {
      img: 7,
      desc: 'The plug-in'
    }, {
      img: 8,
      desc: 'Working'
    }, {
      img: 9,
      desc: 'Waterproof test'
    }, {
      img: 10,
      desc: 'Aging test'
    }, {
      img: 11,
      desc: 'Lighting show'
    }
  ];
});
