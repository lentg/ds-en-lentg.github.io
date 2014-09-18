'use strict'
$ = (id) ->
  document.getElementById id

app = angular.module('daisy', ['ngRoute', 'ui.bootstrap'])
app.run ($location) ->
  page = $ $location.path().split('/')[1]
  $page?.classList.add 'active'
# app.run ($location, $rootScope, $window) ->
#   common = $rootScope.common = $rootScope.common || {
#     clear: ->
#       delete $window.sessionStorage.data
#       $window.location.replace '/'
#   }
  # $rootScope.$on '$routeChangeSuccess', (event, current, previous) ->
  #   currentCtrl = current.controller.substring(0, current.controller.indexOf('Ctrl')).toLowerCase();
  #   $rootScope.common.active[currentCtrl] = 'active'
  #   if previous
  #     previousCtrl = previous.controller.substring(0, previous.controller.indexOf('Ctrl')).toLowerCase()
  #     delete $rootScope.common.active[previousCtrl];
  #     console.log previousCtrl    

app.config ($routeProvider, $locationProvider) ->
  # $locationProvider.html5Mode(true).hashPrefix('!')
  $routeProvider
    .when '/',
      templateUrl: '/views/home.html'
      controller: 'HomeCtrl'
      controllerAs: 'vm'
    .when '/lights',
      templateUrl: 'lightsTmpl'
      controller: 'LightsCtrl'
      controllerAs: 'vm'
    .when '/lights/:name',
      templateUrl: 'lightTmpl'
      controller: 'LightsCtrl'
      controllerAs: 'vm'
    .when '/tags/:tag',
      templateUrl: 'tagsTmpl'
      controller: 'LightsCtrl'
      controllerAs: 'vm'
    .when '/marks/:mark',
      templateUrl: 'marksTmpl'
      controller: 'LightsCtrl'
      controllerAs: 'vm'
    .when '/categories/:category',
      templateUrl: 'categoryTmpl'
      controller: 'LightsCtrl'
      controllerAs: 'vm'
    .when '/news',
      templateUrl: 'NewsTmpl'
      controller: 'NewsCtrl'
      controllerAs: 'vm'
    .when '/about',
      templateUrl: '/views/about.html'
      controller: 'AboutCtrl'
      controllerAs: 'vm'
    # .otherwise
    #   redirectTo: '/'

# app.directive 'ngClear', ($window) ->
#   link: (scope, elm) ->
#     elm.bind 'click', ->
#       delete $window.sessionStorage.data
#       $window.location.href = '/'


app.directive 'focus', ($timeout, $location) ->
  link: (scope, elm) ->
    if '/lights' is $location.path()
      $timeout ->
        elm[0].focus()
    else
      elm.bind 'focus', ->
        $timeout ->
          $location.path 'lights'


# app.directive 'demo', (Data) ->
#   link: (scope, elm) ->
#     elm.bind 'click', ->
#       scope.$$childHead.show?(null)
#       scope.$apply()
  
app.directive 'x', ($location) ->
  link: (scope, elm) ->
    elm.find('a').eq(0).bind 'click', ->
      $li = elm.find 'li'
      elm.find('li').removeClass 'active'
      scope.x = false


app.directive 'xx', ($location) ->
  link: (scope, elm) ->
    $page = $ $location.path().split('/')[1]
    $page?.classList.add 'active'
    $li = elm.find 'li'
    $li.bind 'click', ->
      $li.removeClass 'active'
      this.classList.add 'active' 
      scope.x = false

app.factory 'Data', ($http, $window) ->
  obj = {}
  obj.tags = ['1W', '3W', '8W', '10W', '12W', '15W', '25W', 'Other', 'PAR46', 'PAR64', 'PAR575', 'Flat PAR', 'INDOOR', 'OUTDOOR', 'FULL COLOR', 'SINGLE COLOR']
  obj.marks = s3: 'RGB', s4: 'RGBA/W', s5: 'RGBAW', m2: 'WW 2-IN-1', m3: '3-IN-1', m4: '4-IN-1', m5: '5-IN-1', m6: '6-IN-1', ip20: 'IP20', ip65: 'IP65', ip67: 'IP67', sd: 'Sound Activation', wl: 'Wireless', dmx: 'DMX 512', auto: 'Auto Programs', flick: 'Flicker Free', charge: 'Rechargeable', live: 'LIVE', cast: 'Flight Cast', disco: 'Disco'
  obj.categorys = [
    {k: 'par', v: 'LED PAR'}
    {k: 'city', v: 'City Color'}
    {k: 'moving', v: 'Moving Heads'}
    {k: 'washer', v: 'LED Wall Washer'}
    {k: 'other', v: 'Other'}
  ]

  obj.addMessage = (message) ->
    $http.post('https://daisylight.firebaseio.com/messages.json', JSON.stringify(message))

  if !$window.localStorage.data
    obj.lights = []
    $http.get('/js/lights.json').success (rs) ->
      console.log '...........'
      nums = {}
      nums[tag] = 0 for tag in obj.tags
      nums[cat.k] = 0 for cat in obj.categorys
      
      angular.forEach rs, (val) ->
        nums[val.c] += 1
        for t in val.ts
          nums[t] += 1
        
      obj.lights = rs
      obj.nums = nums
      $window.localStorage.data = JSON.stringify [rs, nums]
  else
    data = JSON.parse $window.localStorage.data
    obj.lights = data[0]
    obj.nums = data[1]
  obj



app.controller 'HomeCtrl', ($scope, $location, $anchorScroll, Data) ->
  vm = this
  $anchorScroll()
  vm.active = {}
  vm.marks = Data.marks
  vm.categorys = Data.categorys
  vm.tags = Data.tags 
  vm.nums = Data.nums
  vm.tops = ['CT80', 'PS1212', 'LF2512', 'AWS1209']
  vm.says = [
    {who: 'Mr. Klaus', hi:'One of Germany customer, said: We import products from your company for more than 6 years already because you never disappoint us on quality and delivery time.'}
    {who: 'Mr. Stephen', hi: 'One of USA customer, said: I buy goods from China many years but I never meet any company like your company efficient. Every email I sent will be detailed reply by you within 10 minutes. Always I can get information from you in time.'}    
    {who: 'Mr. Hong', hi: 'One of South Korea customer, said: you save many times for me because I almost have not got complain from my customers again since we import Cases from your company.'}    
    {who: 'Miss Anita', hi: 'One of Spain customer, said: 2 years ago, we were a new company and do not know products and market very well. But you still support us and help us to develop market. You are our the best partner in China!'}    
    {who: 'Mr. Sveta', hi: 'From Russia company, said: I can keep strong competitiveness in big Russia market these years because of your good quality and competitive price. Could you please do not sell the goods to another Russia company for to keep our company competitive?'}    
  ]
  $scope.$on '$routeChangeStart', (event, current, previous) ->
    currentCtrl = current.controller.substring(0, current.controller.indexOf('Ctrl')).toLowerCase();
    $('lights').classList.add 'active' if currentCtrl is 'lights'
  vm

app.controller 'LightsCtrl', ($routeParams, $location, $anchorScroll, $filter, $timeout, $interval, Data) ->
  vm = this
  $anchorScroll()
  vm.active = {}
  vm.marks = Data.marks
  vm.categorys = Data.categorys
  vm.tags = Data.tags 
  vm.nums = Data.nums

  vm.list = ->
    run = $interval ->
      if Data.lights[0]
        vm.lights = Data.lights
        vm.search = ->
        $interval.cancel run
    , 100
  
  vm.categories = ->
    vm.xx = false
    category = $routeParams.category
    vm.lights = $filter('filter')(Data.lights, c: category)
    angular.forEach vm.categorys, (val) -> vm.title = val.v if val.k is category
    vm.active = c: category

  vm.markss = ->
    mark = $routeParams.mark
    vm.lights = $filter('filter')(Data.lights, ms: mark)
    vm.title = "Marks: #{vm.marks[mark]}"

  vm.tagss = ->
    tag = $routeParams.tag
    vm.lights = $filter('filter')(Data.lights, ts: tag)
    vm.title = "Tags: #{tag}"
    vm.active = ts: [tag]

  vm.view = (name) ->
    run = $interval ->
      if Data.lights[0]
        name = $routeParams.name
        angular.forEach Data.lights, (light) ->
          if light.n is name
            vm.message = {}
            vm.light = light
            vm.title = light.n
            vm.active = c: light.c, ts: light.ts
            vm.relateds = (angular.copy(Data.lights).sort -> 0.5 - Math.random()).slice 0, 4
            $interval.cancel run
            vm.addMessage = (message) ->
              message.time = new Date().getTime()
              Data.addMessage(message).success (res) ->
                alert 'Message send success. We will contact you as soon as possible.'
                message.content = ''
    , 10
  
  vm

app.controller 'NewsCtrl', ($scope) ->
  vm = this
  vm.list = ->
    vm.news = 'news...'
  vm

app.controller 'AboutCtrl', ->
  vm = this
  vm.slides = [
    {img: 1, desc: 'The workshop'}
    # {img: 2, desc: 'The workshop 2'}
    {img: 3, desc: 'Single chip microcomputer'}
    # {img: 4, desc: 'Single chip microcomputer'}
    {img: 5, desc: 'Single chip microcomputer'}
    {img: 6, desc: 'Single chip microcomputer'}
    {img: 7, desc: 'The plug-in'}
    {img: 8, desc: 'Working'}
    {img: 9, desc: 'Waterproof test'}
    {img: 10, desc: 'Aging test'}
    {img: 11, desc: 'Lighting show'}
  ]
  vm

