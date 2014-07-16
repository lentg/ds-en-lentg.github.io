'use strict'
$ = (id) ->
  document.getElementById id
tags = ['1W', '3W', '5W', '8W', '10W', '12W', '15W', '25W', 'PAR46', 'PAR64', 'PAR575', 'Flat PAR', 'INDOOR', 'OUTDOOR', 'FULL COLOR', 'SINGLE COLOR', 'Other']
app = angular.module('daisy', ['ngRoute', 'ui.bootstrap'])
app.config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: '/views/home.html'
        controller: 'HomeCtrl'
      .when '/lights',
        templateUrl: '/views/lights.html'
        controller: 'LightsCtrl'
      .when '/lights/:name',
        templateUrl: '/views/lights.html'
        controller: 'LightsCtrl'
      .when '/news',
        templateUrl: '/views/news.html'
        controller: 'NewsCtrl'
      .when '/about',
        templateUrl: '/views/about.html'
        controller: 'AboutCtrl'
      .otherwise
        redirectTo: '/'

app.directive 'demo', (Data) ->
  link: (scope, elm) ->
    elm.bind 'click', ->
      scope.$$childHead.show?(null)
      scope.$apply()
      

app.directive 'x', ($location) ->
  link: (scope, elm) ->
    $page = $ $location.path().split('/')[1]
    $page?.classList.add 'active'
    $li = elm.find('li')
    $li.bind 'click', ->
      $li.removeClass 'active'
      this.classList.add 'active' 
      scope.x = false
    elm.find('a').eq(0).bind 'click', ->
      $li.removeClass 'active'
      scope.x = false

app.factory 'Data', ($http) ->
  obj = {}
  obj.tags = ['1W', '3W', '8W', '10W', '12W', '15W', '25W', 'Other', 'PAR46', 'PAR64', 'PAR575', 'Flat PAR', 'INDOOR', 'OUTDOOR', 'FULL COLOR', 'SINGLE COLOR']
  obj.categorys = [
    {k: 'par', v: 'LED PAR'}
    {k: 'city', v: 'City Color'}
    {k: 'moving', v: 'Moving Heads'}
    {k: 'washer', v: 'LED Wall Washer'}
    {k: 'other', v: 'Other'}
  ]
  if !store.get 'data'
    $http.get('/js/lights.json').success (rs) ->
      nums = {}
      nums[tag] = 0 for tag in obj.tags
      nums[cat.k] = 0 for cat in obj.categorys
      
      angular.forEach rs, (val) ->
        nums[val.c] += 1
        for t in val.ts
          nums[t] += 1
        
      obj.lights = rs
      obj.nums = nums
      store.set 'data', [rs, nums]
  else
    data = store.get 'data'
    obj.lights = data[0]
    obj.nums = data[1]
  obj

app.controller 'HomeCtrl', ($scope, Data) ->
  console.log 'home...'

app.controller 'LightsCtrl', ($scope, $routeParams, $anchorScroll, Data) ->
  $scope.lights = Data.lights
  $scope.categorys = Data.categorys
  $scope.tags = Data.tags 
  $scope.nums = Data.nums
  # $scope.search = {}

  $scope.setCategory = (category) ->
    $anchorScroll()
    $scope.light = ''
    $scope.search = c: category
    angular.forEach $scope.categorys, (val) -> $scope.title = val.v if val.k is category
  
  $scope.setMark = (mk) ->
    $anchorScroll()
    $scope.light = ''
    $scope.search = ms: mk
  
  $scope.setTag = (tag) ->
    $anchorScroll()
    $scope.light = ''
    $scope.search = ts: tag
    $scope.title = "Tags: #{tag}"
  
  $scope.show = (light) ->
    $anchorScroll()
    $scope.search = c: light?.c, ts: light?.ts
    $scope.light = light
    $scope.title = light?.n
  
  $scope.send = (message) ->
    console.log message
    $scope.message = ''
  if name = $routeParams.name
    angular.forEach $scope.lights, (val) -> $scope.show(val) if val.n is name
        
app.controller 'NewsCtrl', ($scope) ->
  console.log 'news...'

app.controller 'AboutCtrl', ($scope, Data) ->
  console.log 'about...'
