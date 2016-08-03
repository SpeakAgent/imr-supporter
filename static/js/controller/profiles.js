mainApp.controller('profilesController', function($scope, $http) {
    console.log("profiles Controller");

    var ureq = {
        url: "http://iamready.herokuapp.com/users/user/all/",
        data: {
            pk: 1,
            mode: "simple"
        },
        method: "POST"
    }

    $http(ureq).success(function(data){
        $scope.users = data
    })

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
