mainApp.controller('assignController', function($scope, $location, $http, $filter) {
    console.log("Assign Controller");

    $scope.formData = {};

    $scope.stepOne = false;
    $scope.stepTwo = false;

    var ureq = {
        url: "http://iamready.herokuapp.com/users/user/all/",
        data: {
            pk: localStorage.getItem('pk'),
            mode: "simple"
        },
        method: "POST",
        headers: {
            Authorization: 'JWT ' + localStorage.getItem('authToken')
        },
    }

    $http(ureq).success(function(data) {
        $scope.users = data;
        $scope.toAssign = {};
        for (var i in $scope.users) {
            $scope.toAssign[$scope.users[i].pk] = {
                first_name: $scope.users[i].first_name,
                last_name: $scope.users[i].last_name,
                pk: $scope.users[i].pk,
                tasks: [],
                contacts: $scope.users[i].contacts
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
        method: "POST",
        headers: {
            Authorization: 'JWT ' + localStorage.getItem('authToken')
        },
    }

    $http(treq).success(function(data) {
        $scope.tasks = data;
        $scope.taskInfo = {};
        for (var i in $scope.tasks) {
            $scope.taskInfo[$scope.tasks[i].pk] = $scope.tasks[i].title
        }
    })

    $scope.assignTask = function (user, task) {
        var i = $scope.toAssign[user].tasks.indexOf(task)

        if (i == -1) {
            $scope.toAssign[user].tasks.push(
                {
                    pk:task.pk,
                    startTime: null,
                    endTime: null,
                    startDate: null,
                    title: task.title
                }
            )
        } else {
            $scope.toAssign[user].tasks.pop(i)
        }
    }

    $scope.assignTasks = function () {
        data = {"tasks": []};

        for (var ui in $scope.toAssign) {
            console.log(ui, $scope.toAssign[ui]);

            var upk = $scope.toAssign[ui].pk;
            for (var ti in $scope.toAssign[upk].tasks) {
                var task_data = {};
                console.log("task", $scope.toAssign[upk].tasks[ti])
                var task = $scope.toAssign[upk].tasks[ti];
                task_data['upk'] = $scope.toAssign[ui].pk;
                task_data['tpk'] = $scope.toAssign[ui].tasks[ti].pk;
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
                if ("contact" in task) {
                    task_data['contact'] = task.contact;
                }

                data.tasks.push(task_data);
            }

        }

        var req = {
            url: "http://iamready.herokuapp.com/events/task/assign/many",
            data: {tasks: JSON.stringify(data)},
            method: "POST",
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('authToken')
            },
        }

        console.log("Assigning", req)

        $http(req).success(function(data){
            $location.path('/schedules');
            console.log(data);
        }).error(function(data){
            console.log(data);
        })
    }
})
