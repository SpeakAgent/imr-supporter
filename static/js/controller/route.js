var mainApp = angular.module('mainApp', ['ui.router', 'uiRouterStyles', 'ui.bootstrap', 'ngAnimate', 'flow']);

mainApp.config(function (datepickerConfig, datepickerPopupConfig) {
      datepickerConfig.showWeeks = false;
      datepickerPopupConfig.toggleWeeksText = false;
    });

mainApp.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to
  $urlRouterProvider.otherwise("/login");

  $stateProvider
  .state('login', {
    url: "/login",
    templateUrl: 'templates/login.html',
    data: {
      css: 'static/css/views/login.css'
    }
  })
  .state('dashboard', {
    url: "/dashboard",
    templateUrl: 'templates/dashboard.html',
    data: {
      css: 'static/css/views/dashboard.css'
    }
  })
  .state('tasks', {
    url: "/tasks",
    templateUrl: 'templates/tasks.html',
    data: {
      css: 'static/css/views/task.css'
    }
  })
  .state('createTask', {
    url: "/tasks/create",
    templateUrl: 'templates/createTask.html',
    data: {
      css: 'static/css/views/createTask.css'
    }
  })
  .state('editTask', {
    url: "/tasks/edit/:pk",
    templateUrl: 'templates/editTask.html',
    data: {
      css: 'static/css/views/editTask.css'
    }
  })
  .state('assign', {
    url: "/assign",
    templateUrl: 'templates/assign.html',
    data: {
      css: 'static/css/views/assign.css'
    }
  })
  .state('schedules', {
    url: "/schedules",
    templateUrl: 'templates/schedules.html',
    data: {
      css: 'static/css/views/schedules.css'
    }
  })
  .state('viewDay', {
    url: "/schedules/day/:pk",
    templateUrl: 'templates/viewDay.html',
    data: {
      css: 'static/css/views/viewDay.css'
    }
  })
  .state('viewWeek', {
    url: "/schedules/week/:pk",
    templateUrl: 'templates/viewWeekly.html',
    data: {
      css: 'static/css/views/viewWeekly.css'
    }
  })
  .state('assign', {
    url: "/assign",
    templateUrl: 'templates/assign_tasks.html',
    data: {
      css: 'static/css/views/profiles.css'
    }
  })
  .state('profile', {
    url: "/profiles/:pk",
    templateUrl: 'templates/profile_edit.html',
    data: {
      css: 'static/css/views/profiles.css'
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
