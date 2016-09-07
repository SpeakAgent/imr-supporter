mainApp.controller('dashboardController', function($scope, $http) {
    console.log("dashboard Controller");

    var req = {
        url: "http://iamready.herokuapp.com/events/task/next/",
        data: {
            pk: 1,
        },
        method: "POST",
        headers: {
            Authorization: 'JWT ' + localStorage.getItem('authToken')
        },
    }

    $http(req).success(function(data) {
        $scope.event = data
    })
});
