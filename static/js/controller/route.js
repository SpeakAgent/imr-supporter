var mainApp = angular.module('mainApp', ['ui.router']);

mainApp.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/dashboard");

  $stateProvider
  .state('dashboard', {
    url: "/dashboard",
    templateUrl: 'templates/dashboard.html',
    css: 'css/views/dashboard.css'
  })
  .state('task', {
    url: "/task",
    templateUrl: 'templates/task.html',
    css: 'css/views/task.css'
  })
  .state('schedules', {
    url: "/schedules",
    templateUrl: 'templates/schedules.html',
    css: 'css/views/schedules.css'
  })
  .state('profiles', {
    url: "/profiles",
    templateUrl: 'templates/profiles.html',
    css: 'css/views/profiles.css'
  })
  .state('notifications', {
    url: "/notifications",
    templateUrl: 'templates/notifications.html',
    css: 'css/views/notifications.css'
  })
  .state('help', {
    url: "/help",
    templateUrl: 'templates/help.html',
    css: 'css/views/help.css'
  })
});
