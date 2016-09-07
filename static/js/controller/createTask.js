mainApp.controller('createTaskController', function($scope, $location, $http, $filter) {
    console.log("create task Controller");

    $('.selectpicker').selectpicker({
    });

    $scope.formData = {
        users: [],
        steps: [""]
    }

    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    $scope.days = [];
    for(var i=1;i<32;i++){
        $scope.days.push(i);
    }

    $scope.years = ["2016" ,"2017" ,"2018" ,"2019"];

    $scope.hours = [];
    for (var i=1; i<25;i++) {
        $scope.hours.push(i);
    }

    $scope.minutes = [];
    for (var i=0; i<60; i++) {
        var s = i.toString();
        if (s.length == 1) {
            s = "0" + s
        }
        $scope.minutes.push(s)
    }

    var ureq = {
        url: "http://iamready.herokuapp.com/users/user/all/",
        data: {
            pk: 1,
            mode: "simple"
        },
        method: "POST",
        headers: {
            Authorization: 'JWT ' + localStorage.getItem('authToken')
        },
    }

    $http(ureq).success(function(data){
        $scope.users = data
    })

    $scope.isActive = function (routes) {
        angular.forEach(routes, function(route){
            if(route === $location.path()) {
                return true;
            }
        });
    }

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.startPopover = {
        templateUrl: 'templates/includes/startTime.html'
    };

    $scope.endPopover = {
        templateUrl: 'templates/includes/endTime.html'
    };


    $('.form-active-basic').on('focus blur', function() {
        $('#basic').toggleClass("form-active-blue");
    });

    $('.form-active-special').on('focus blur', function() {
        $('#special').toggleClass("form-active-blue");
    });

    $('.form-active-adding').on('focus blur', function() {
        $('#adding').toggleClass("form-active-blue");
    });

    $('.fa-calendar-o').datepicker('show');

    $scope.createTask = function () {

        // Get all of the easy stuff in first

        var data = {}
        data.owner_pk = 1;

        fields = ['title', 'video', 'cagetory', 'help_text', 'recurring',
        'recurring_weekly', 'recurring_daily', 'date', 'start_time', 'end_time']

        for (i in fields) {
            if (fields[i] in $scope.formData) {
                data[fields[i]] = $scope.formData[fields[i]]
            }
            if (fields[i] == 'date') {
                $scope.formData.date = $filter('date')($scope.formData.date, 'yyyy-MM-dd');
            }
            if (fields[i] == 'start_time') {
                $scope.formData.start_time = $filter('date')($scope.formData.start_time, 'HH:mm');
            }
            if (fields[i] == 'end_time') {
                $scope.formData.end_time = $filter('date')($scope.formData.end_time, 'HH:mm');
            }
        }

        // Now the harder stuff

        // Users to assign the task to
        if ($scope.formData.users.length > 0) {
            var u = [];
            for (user in $scope.formData.users) {
                u.push(user)
            }
            data.users = u.join(',')
        }

        // Add the steps
        if ($scope.formData.steps.length > 0) {
            steps = []
            for (i in $scope.formData.steps) {
                s = i + "::" + $scope.formData.steps[i];
                steps.push(s)
            }
            data.steps = steps.join(":::")
        }

        var req = {
            url: "http://iamready.herokuapp.com/events/mastertask/create/",
            data: data,
            method: "POST",
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('authToken')
            },
        }

        $http(req).success(function(data){
            console.log("Created!")
            $location.path('/tasks');
        })
        .error(function(data){
        })
    }


})

mainApp.directive('input.form-active-adding', function(){
    return{
       restrict: 'C',
       link: function(scope, element, attrs){
          element.on('focus', function(e){
              e.stopPropagation();
              element.children().toggleClass('form-active-blue');
          })
       }
    }
})
