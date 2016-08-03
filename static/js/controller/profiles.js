mainApp.controller('profilesController', function($scope, $http) {
    console.log("profiles Controller");

    var req = {
        url: "http://iamready.herokuapp.com/users/user/all/",
        method: "POST",
        data: {
            mode: "simple"
        }
    }

    $http(req).success(function(data) {
        $scope.students = data
    })
});

mainApp.controller('profileController', function($scope, $http, $stateParams) {
    console.log("profiles Controller");

    var req = {
        url: "http://iamready.herokuapp.com:80/users/user/one/",
        method: "POST",
        data: {
            pk: $stateParams.pk
        }
    }

    $http(req).success(function(data) {
        $scope.student = data
    })
});
