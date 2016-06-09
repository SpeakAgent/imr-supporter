mainApp.controller('profilesController', function($scope) {
    console.log("profiles Controller");

    $scope.profile = [
        {
            open: false
        }
    ];

    $scope.emergency = [
        {
            open: false
        }
    ];
});
