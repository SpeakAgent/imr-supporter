mainApp.controller('createTaskController', function($scope, $location) {
    console.log("create task Controller");

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
});
