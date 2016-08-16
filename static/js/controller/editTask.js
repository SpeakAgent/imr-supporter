mainApp.controller('editTaskController', function($scope, $location, $http, $stateParams) {

    $scope.formData = {
        users: [],
        steps: []
    }

    $scope.toDeleteIndexes = [];
    $scope.toDeletePKs = []

    $scope.toDelete = function(index) {
        if ($scope.toDeleteIndexes.indexOf(index) >= 0) {
            return {"text-decoration": "line-through"}
        }
    }

    $scope.updateDelete = function(index, pk) {
        var i = $scope.toDeleteIndexes.indexOf(index)
        if (i >= 0) {
            $scope.toDeleteIndexes.pop(i)
            if (pk != -1) {
                var p = $scope.toDeletePKs.indexOf(pk)
                $scope.toDeletePKs.pop(p)
            }
        } else {
            $scope.toDeleteIndexes.push(index)
            if (pk != -1) {
                $scope.toDeletePKs.push(pk)
            }
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
            $scope.task.steps[i].state = "unmodified";
        }
        $scope.formData.steps = data.steps;
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
        $scope.task.steps.push({state: 'unmodified', pk: -1})
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

        var data = {pk: $scope.task.pk}
        
        // The basic stuff
        var fields = ['title', 'video', 'help_text', 'task_type'];

        for (var i in fields) {
            if (fields[i] in $scope.formData) {
                data[fields[i]] = $scope.formData[fields[i]]
            }
        }

        // Steps

        //// Delete these steps
        if ($scope.toDeletePKs.length != 0) {
            data.delete_steps = $scope.toDeletePKs.join(',');    
        }

        ////  Add  / update these steps
        var toAddVals = [];
        var toUpdateVals = []
        for (var i in $scope.formData.steps) {
            var s = $scope.formData.steps[i];
            if (s.pk == -1) {
                // wait wait! We need to make sure it's really supposed 
                // to be added!
                if ($scope.toDeleteIndexes.indexOf(parseInt(i, 10)) == -1) {
                    toAddVals.push(s.title)    
                }
                
            } else {
                toUpdateVals.push(s.pk + "::" + s.title)
            }
        }
        if (toAddVals.length != 0) {
            data.add_steps = toAddVals.join('::')
        }

        if (toUpdateVals.length != 0) {
            data.update_steps = toUpdateVals.join(':::')
        }

        var req = {
            url: "http://iamready.herokuapp.com/events/mastertask/update/",
            data: data,
            method: "POST"
        }

        console.log(req);

        $http(req).success(function(data){
            $location.path('/tasks')
        })

    }

    
});
