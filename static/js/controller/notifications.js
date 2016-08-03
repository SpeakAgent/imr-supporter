mainApp.controller('notificationsController', function($scope, $http) {
    console.log("notifications Controller");

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
});
