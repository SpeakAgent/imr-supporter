mainApp.controller('taskController', function($scope, $http) {
    console.log("task Controller");

    var req = {
        url: "http://iamready.herokuapp.com/events/mastertask/all/",
        data: {
            pk: 1,
        },
        method: 'POST'
    }

    console.log(req)

    $http(req).success(function(data) {
        $scope.tasks = data;
    })
    .error(function(data){
        // console.log(data)
    })
});
