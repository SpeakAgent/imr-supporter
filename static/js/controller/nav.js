mainApp.controller('navController', function($scope, $location) {
    console.log("create nav Controller");

    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };
});
