mainApp.controller('taskController', function($scope, $http) {
    console.log("task Controller");

    $scope.showTask = function(task) {
        console.log(task)
        $scope.task = task;
    }

    var req = {
        url: "http://iamready.herokuapp.com/events/mastertask/all/",
        data: {
            pk: 1,
        },
        method: 'POST',
        headers: {
            Authorization: 'JWT ' + localStorage.getItem('authToken')
        },
    }

    console.log(req)

    $http(req).success(function(data) {
        $scope.tasks = data;
    })
    .error(function(data){
        console.log(data)
    })
});
