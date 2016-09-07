mainApp.controller('assignController', function($scope, $location, $http, $filter) {
    console.log("Assign Controller");

    $scope.formData = {};

    $scope.stepOne = false;
    $scope.stepTwo = false;

    var ureq = {
        url: "http://iamready.herokuapp.com/users/user/all/",
        data: {
            pk: 1,
            mode: "simple"
        },
        method: "POST"
    }

    $http(ureq).success(function(data) {
        $scope.users = data;
        $scope.toAssign = {};
        for (var i in $scope.users) {
            $scope.toAssign[$scope.users[i].pk] = {
                first_name: $scope.users[i].first_name,
                last_name: $scope.users[i].last_name,
                pk: $scope.users[i].pk,
                tasks: []
            }
        }
        $scope.stepOne = true;
    })

    var treq = {
        url: "http://iamready.herokuapp.com:80/events/mastertask/all/",
        data: {
            pk: 1,
            mode: "simple"
        },
        method: "POST"
    }

    $http(treq).success(function(data) {
        $scope.tasks = data;
        $scope.taskInfo = {};
        for (var i in $scope.tasks) {
            $scope.taskInfo[$scope.tasks[i].pk] = $scope.tasks[i].title
        }
    })

    $scope.assignTask = function (user, task) {
        i = $scope.toAssign[user].tasks.indexOf(task)

        if (i == -1) {
            $scope.toAssign[user].tasks.push(task)
        } else {
            $scope.toAssign[user].tasks.pop(i)
        }
    }

    $scope.assignTasks = function () {
        data = {"tasks": []};

        for (var ui in $scope.toAssign) {
            var task_data = {};
            upk = $scope.toAssign[ui].pk;
            for (var ti in $scope.toAssign[upk].tasks) {
                task = $scope.toAssign[upk].tasks[ti];
                task_data['upk'] = upk;
                task_data['tpk'] = task.pk;
                task_data['sdate'] = $filter('date')(task.startDate, "yyyy-MM-dd");
                task_data['stime'] = $filter('date')(task.startTime, "HH:mm");
                task_data['etime'] = $filter('date')(task.endTime, "HH:mm");
                task_data['repeats'] = [];
                if (task.weekly == true) {
                    task_data['repeats'].push("weekly")
                }
                if (task.daily == true) {
                    task_data['repeats'].push("daily")
                }

                data.tasks.push(task_data);
            }

        }

        var req = {
            url: "http://iamready.herokuapp.com/events/task/assign/many",
            data: {tasks: JSON.stringify(data)},
            method: "POST"
        }

        console.log(req)

        $http(req).success(function(data){
            $location.path('/schedules');
            console.log(data);
        }).error(function(data){
            console.log(data);
        })
    }
})

mainApp.directive('selectPicker', ['$timeout', function($timeout){
    return {
        restrict: 'A',
        link:function(scope, elem){
            $timeout(function() {
                elem.selectpicker({});
            }, 0);
        }
    };
}])
