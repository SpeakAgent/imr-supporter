mainApp.controller('editTaskController', function($scope, $location, $http, $stateParams) {

    $scope.formData = {
        users: [],
        steps: []
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
    var treq = {
        url: "http://iamready.herokuapp.com/events/mastertask/one/",
        data: {
            pk: $stateParams.pk
        },
        method: "POST"
    }

    $http(treq).success(function(data){
        $scope.task = data;
        var datevals = $scope.task.date.split("-");
        $scope.currDay = parseInt(datevals[2]);
        $scope.currMonth = $scope.months[parseInt(datevals[1])-1];
        $scope.currYear = parseInt(datevals[0]);
        $scope.currStartHour = $scope.task.start_time.split(":")[0];
        $scope.currEndHour = $scope.task.end_time.split(":")[0];
        $scope.currStartMin = $scope.task.start_time.split(":")[1];
        $scope.currEndMin = $scope.task.end_time.split(":")[1];
    })

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
