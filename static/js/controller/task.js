mainApp.controller('taskController', function($scope, $http) {
    console.log("task Controller");

    var req = {
        url: "https://iamready.herokuapp.com:80/events/mastertask/all/",
        pk: 1
    }

    $http(req).success(function(data) {
        $scope.tasks = data;
    })
});
