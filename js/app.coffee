shuffle = (arr) ->
  ci = arr.length
  while(0 isnt ci)
    ri = Math.floor Math.random()*ci
    ci -= 1
    tmp = arr[ci]
    arr[ci] = arr[ri]
    arr[ri] = tmp
  arr

angular.module('daisy', ['ngRoute', 'angular-carousel'])
.filter 'unsafe', ($sce) ->
  (val) ->
    $sce.trustAsHtml val


.run ($route, $rootScope, $location, helper) ->
  original = $location.path
  $location.path = (path, reload) ->
    if reload is false
      lastRoute = $route.current
      un = $rootScope.$on '$locationChangeSuccess', ->
        $route.current = lastRoute
        un()
    original.apply $location, [path]


.config ($routeProvider) ->
  $routeProvider
    .when '/',
      templateUrl: '/views/lights.html'
      controller: 'LightsCtrl'
      controllerAs: 'vm'
    .when '/lights',
      templateUrl: '/views/lights.html'
      controller: 'LightsCtrl'
      controllerAs: 'vm'
    .when '/lights/:name',
      templateUrl: '/views/lights.html'
      controller: 'LightsCtrl'
      controllerAs: 'vm'
    .otherwise
    redirectTo: '/lights'


.factory 'helper', ($http) ->
  obj = {}
  $http.get '/js/lights.json', cache: true
    .success (rs) ->
      obj.lights = rs
      obj.load = true
  obj


# .controller 'HomeCtrl', ->
#   vm = this
#   vm
  
.controller 'LightsCtrl', ($window, $location, $routeParams, $anchorScroll, $timeout, $interval, helper) ->
  vm = this
  vm.q = {}
  vm.related = []
  vm.lights = $window.lights unless vm.lights 
  vm.cts = 
    par: 'LED PAR'
    city: 'City Color'
    moving: 'Moving Heads'
    washer: 'LED Wall Washer'
    other: 'Other'
  vm.wts = ['1W', '3W', '5W', '10W', '12W', '15W', 'other']
  vm.mks = ['s3', 's4', 's5', 'm2', 'm3', 'm4', 'm5', 'm6', 'ip20', 'ip65', 'ip67', 'sd', 'wl', 'dmx', 'charge']
  vm.ats = ['Flat PAR', 'INDOOR', 'OUTDOOR', 'FULL COLOR', 'SINGLE COLOR', 'OTHER']

  vm.closes = ->
    vm.on = false
    $timeout ->
      $location.hash 'top'
      $anchorScroll()
      $location.path '/', false
      vm.light = ''
    , 200

  vm.init = ->
    stop = $interval ->
      if helper.lights
        $interval.cancel stop
        stop = null
        vm.lights = helper.lights
    , 250

  vm.category = (category) ->
    vm.open=false
    vm.q = c: category
    vm.c = vm.cts[category]

  vm.mark = (mark) ->
    vm.closes()
    vm.q = ms: mark
    vm.c = ''
  
  vm.tag = (tag) ->
    vm.closes()
    vm.q = ts: tag
    vm.c = tag

  vm.view = (light) ->
    vm.on = true
    vm.light = light
    vm.is = vm.light.is.toString()
    len = vm.lights.length - 4
    pos = Math.floor Math.random()*len
    vm.related = vm.lights[pos...pos+4]
    $timeout ->
      $location.path "/lights/#{light.n}", false
    , 200



  vm.view2 = (light) ->
    vm.on =false
    $timeout ->
      vm.light = ''
      $location.hash 'top'
      $anchorScroll()
    , 450
    $timeout ->
      vm.view(light)
    , 500



  vm.init()
  if name = $routeParams.name
    for light in vm.lights
      if name is light.n
        vm.view(light)
        return
    stop1 = $interval ->
      if helper.lights
        $interval.cancel stop1
        stop1 = null
        for light in helper.lights
          if name is light.n
            vm.view light
            return
    , 250
    
  vm
