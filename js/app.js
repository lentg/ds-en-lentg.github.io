// Generated by CoffeeScript 1.7.1
'use strict';
var $, app;

$ = function(id) {
  return document.getElementById(id);
};

app = angular.module('daisy', ['ngRoute', 'ui.bootstrap']);

app.run(function($location) {
  var page;
  page = $($location.path().split('/')[1]);
  return typeof $page !== "undefined" && $page !== null ? $page.classList.add('active') : void 0;
});

app.config(function($routeProvider, $locationProvider) {
  return $routeProvider.when('/', {
    templateUrl: '/views/home.html',
    controller: 'HomeCtrl',
    controllerAs: 'vm'
  }).when('/lights', {
    templateUrl: '/views/lights.html',
    controller: 'LightsCtrl',
    controllerAs: 'vm'
  }).when('/lights/:name', {
    templateUrl: '/views/light.html',
    controller: 'LightsCtrl',
    controllerAs: 'vm'
  }).when('/tags/:tag', {
    templateUrl: '/views/tags.html',
    controller: 'LightsCtrl',
    controllerAs: 'vm'
  }).when('/marks/:mark', {
    templateUrl: '/views/marks.html',
    controller: 'LightsCtrl',
    controllerAs: 'vm'
  }).when('/categories/:category', {
    templateUrl: '/views/categories.html',
    controller: 'LightsCtrl',
    controllerAs: 'vm'
  }).when('/news', {
    templateUrl: '/views/news.html',
    controller: 'NewsCtrl',
    controllerAs: 'vm'
  }).when('/about', {
    templateUrl: '/views/about.html',
    controller: 'AboutCtrl',
    controllerAs: 'vm'
  });
});

app.directive('focus', function($timeout, $location) {
  return {
    link: function(scope, elm) {
      if ('/lights' === $location.path()) {
        return $timeout(function() {
          return elm[0].focus();
        });
      } else {
        return elm.bind('focus', function() {
          return $timeout(function() {
            return $location.path('lights');
          });
        });
      }
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
      return elm.find('a').eq(0).bind('click', function() {
        var $li;
        $li = elm.find('li');
        elm.find('li').removeClass('active');
        return scope.x = false;
      });
    }
  };
});

app.directive('xx', function($location) {
  return {
    link: function(scope, elm) {
      var $li, $page;
      $page = $($location.path().split('/')[1]);
      if ($page != null) {
        $page.classList.add('active');
      }
      $li = elm.find('li');
      return $li.bind('click', function() {
        $li.removeClass('active');
        this.classList.add('active');
        return scope.x = false;
      });
    }
  };
});

app.factory('Data', function($http, $window) {
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
  obj.addMessage = function(message) {
    return $http.post('https://daisylight.firebaseio.com/messages.json', JSON.stringify(message));
  };
  if (!$window.sessionStorage.data) {
    $http.get('/js/lights.json').success(function(rs) {
      var cat, nums, tag, _i, _j, _len, _len1, _ref, _ref1;
      console.log('...........');
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
      return $window.sessionStorage.data = JSON.stringify([rs, nums]);
    });
  } else {
    data = JSON.parse($window.sessionStorage.data || '[]');
    obj.lights = data[0];
    obj.nums = data[1];
  }
  return obj;
});

app.controller('HomeCtrl', function($location, Data) {
  var vm;
  vm = this;
  vm.active = {};
  vm.marks = Data.marks;
  vm.categorys = Data.categorys;
  vm.tags = Data.tags;
  vm.nums = Data.nums;
  vm.tops = ['CT80', 'PS1212', 'LF2512', 'AWS1209'];
  vm.says = [
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
  return vm;
});

app.controller('LightsCtrl', function($routeParams, $location, $anchorScroll, $filter, Data) {
  var vm;
  vm = this;
  $anchorScroll();
  vm.active = {};
  vm.marks = Data.marks;
  vm.categorys = Data.categorys;
  vm.tags = Data.tags;
  vm.nums = Data.nums;
  vm.list = function() {
    vm.lights = Data.lights;
    return vm.search = function() {};
  };
  vm.categories = function() {
    var category;
    vm.xx = false;
    category = $routeParams.category;
    vm.lights = $filter('filter')(Data.lights, {
      c: category
    });
    angular.forEach(vm.categorys, function(val) {
      if (val.k === category) {
        return vm.title = val.v;
      }
    });
    return vm.active = {
      c: category
    };
  };
  vm.markss = function() {
    var mark;
    mark = $routeParams.mark;
    vm.lights = $filter('filter')(Data.lights, {
      ms: mark
    });
    return vm.title = "Marks: " + vm.marks[mark];
  };
  vm.tagss = function() {
    var tag;
    tag = $routeParams.tag;
    vm.lights = $filter('filter')(Data.lights, {
      ts: tag
    });
    vm.title = "Tags: " + tag;
    return vm.active = {
      ts: [tag]
    };
  };
  vm.view = function(name) {
    name = $routeParams.name;
    angular.forEach(Data.lights, function(light) {
      if (light.n === name) {
        vm.message = {};
        vm.light = light;
        vm.title = light.n;
        return vm.active = {
          c: light.c,
          ts: light.ts
        };
      }
    });
    vm.relateds = (angular.copy(Data.lights).sort(function() {
      return 0.5 - Math.random();
    })).slice(0, 4);
    return vm.addMessage = function(message) {
      message.time = new Date().getTime();
      return Data.addMessage(message).success(function(res) {
        alert('Message send success. We will contact you as soon as possible.');
        return message.content = '';
      });
    };
  };
  return vm;
});

app.controller('NewsCtrl', function($scope) {
  var vm;
  vm = this;
  vm.news = 'news...';
  return vm;
});

app.controller('AboutCtrl', function() {
  var vm;
  vm = this;
  vm.slides = [
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
  return vm;
});
