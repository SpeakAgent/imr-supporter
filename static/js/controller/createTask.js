mainApp.controller('createTaskController', function($scope, $location) {
    console.log("create task Controller");

    $scope.isActive = function (routes) {
        angular.forEach(routes, function(route){
            if(route === $location.path()) {
                return true;
                console.log("Yes");
            } else {
                console.log($location.path());
            }
        });
    }

    $('.form-active-basic').on('focus blur', function() {
        $('#basic').toggleClass("form-active-blue");
    });

    $('.form-active-special').on('focus blur', function() {
        $('#special').toggleClass("form-active-blue");
    });

    $('.form-active-adding').on('focus blur', function() {
        $('#adding').toggleClass("form-active-blue");
    });
});
