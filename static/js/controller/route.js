var mainApp = angular.module('mainApp', ['ui.router', 'uiRouterStyles']);

mainApp.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/dashboard");

  $stateProvider
  .state('dashboard', {
    url: "/dashboard",
    templateUrl: 'templates/dashboard.html',
    data: {
      css: 'static/css/views/dashboard.css'
    }
  })
  .state('task', {
    url: "/task",
    templateUrl: 'templates/task.html',
    data: {
      css: 'static/css/views/task.css'
    }
  })
  .state('createTask', {
    url: "/createTask",
    templateUrl: 'templates/createTask.html',
    data: {
      css: 'static/css/views/createTask.css'
    }
  })
  .state('schedules', {
    url: "/schedules",
    templateUrl: 'templates/schedules.html',
    data: {
      css: 'static/css/views/schedules.css'
    }
  }).state('viewDay', {
    url: "/viewDay",
    templateUrl: 'templates/viewDay.html',
    data: {
      css: 'static/css/views/viewDay.css'
    }
  })
  .state('viewWeekly', {
    url: "/viewWeekly",
    templateUrl: 'templates/viewWeekly.html',
    data: {
      css: 'static/css/views/viewWeekly.css'
    }
  })
  .state('profiles', {
    url: "/profiles",
    templateUrl: 'templates/profiles.html',
    data: {
      css: 'static/css/views/profiles.css'
    }
  })
  .state('notifications', {
    url: "/notifications",
    templateUrl: 'templates/notifications.html',
    data: {
      css: 'static/css/views/notifications.css'
    }
  })
  .state('help', {
    url: "/help",
    templateUrl: 'templates/help.html',
    data: {
      css: 'static/css/views/help.css'
    }
  })
});
