mainApp.controller('editTaskController', function($scope, $location, $http, $stateParams) {

    $scope.formData = {
        users: [],
        steps: []
    }

    $scope.toDeleteIndexes = [0]

    $scope.toDelete = function(index) {
        if ($scope.toDeleteIndexes.indexOf(index) >= 0) {
            return {"text-decoration": "line-through"}
        }
    }

    $scope.updateDelete = function(index) {
        var i = $scope.toDeleteIndexes.indexOf(index)
        if (i >= 0) {
            $scope.toDeleteIndexes.pop(i)
        } else {
            $scope.toDeleteIndexes.push(index)
        }
    }
    
    var treq = {
        url: "http://iamready.herokuapp.com/events/mastertask/one/",
        data: {
            pk: $stateParams.pk
        },
        method: "POST"
    }

    $http(treq).success(function(data){
        $scope.task = data;
        for (var i in $scope.task.steps) {
            $scope.task.steps[i].state = "unmodified"
        }
    })

    var ureq = {
        url: "http://iamready.herokuapp.com/users/user/all/",
        data: {
            pk: 1
        },
        method: "POST"
    }

    $http(ureq).success(function(data){
        $scope.users = data
    })

    $scope.addStep = function() {
        $scope.task.steps.push({state: 'unmodified'})
    }

    $scope.isActive = function (routes) {
        angular.forEach(routes, function(route){
            if(route === $location.path()) {
                return true;
            }
        });
    }

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.dynamicPopover = {
        templateUrl: 'templates/includes/startTime.html'
    };

    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
    };

    $scope.changed = function () {
        console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
        $scope.mytime = null;
    };

    $(function () {
        $('#check').webuiPopover({trigger:'manual', placement:'bottom', type:'html', arrow:false});
        $('#check').on("click", function (event) {
            var self = $('#check');
            if (self.is(':checked')) {
                self.webuiPopover('show');
            }
            else {
                self.webuiPopover('hide');
            }
        });
    })

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

    $scope.updateTask = function () {

        // Get all of the easy stuff in first

        var data = {'pk': $scope.task.pk}
        data.owner_pk = 1;

        fields = ['title', 'video', 'category', 'help_text', 'recurring', 
            'recurring_weekly', 'recurring_daily', 'year', 'day']

        for (i in fields) {
            if (fields[i] in $scope.formData) {
                data[fields[i]] = $scope.formData[fields[i]]
            }
        }

        // Now the harder stuff

        // Add the steps
        if ($scope.formData.steps.length > 0) {
            steps = []
            for (i in $scope.formData.steps) {
                s = i + "::" + $scope.formData.steps[i];
                steps.push(s)
            }
            data.steps = steps.join(":::")
        } 

        // Get the month

        if ('month' in $scope.formData) {
            data.month = $scope.months.indexOf($scope.formData['month']) + 1
        }

        // Time stuff

        if ('start_hour' in $scope.formData && 'start_minute' in $scope.formData) {
            data.start_time = $scope.formData['start_hour'] + ":" + $scope.formData['start_minute']
        } else if ('start_hour' in $scope.formData) {
            data.start_time = $scope.formData['start_hour'] + ":" + $scope.task.start_time.split(":")[1]
        } else if ('start_minute' in $scope.formData) {
            data.start_time = $scope.task.start_time.split(":")[0] + ":" + $scope.formData['start_minute']
        }

        
        if ('end_hour' in $scope.formData && 'end_minute' in $scope.formData) {
            data.end_time = $scope.formData['end_hour'] + ":" + $scope.formData['end_minute']
        } else if ('end_hour' in $scope.formData) {
            data.end_time = $scope.formData['end_hour'] + ":" + $scope.task.end_time.split(":")[1]
        } else if ('end_minute' in $scope.formData) {
            data.end_time = $scope.task.end_time.split(":")[0] + ":" + $scope.formData['end_minute']
        }

        var req = {
            url: "http://iamready.herokuapp.com/events/mastertask/update/",
            data: data,
            method: "POST"
        }

        console.log(req)

        $http(req).success(function(data){
            console.log("Updated!")
        })
        .error(function(data){
            console.log(data)
        })
    }

    
});
