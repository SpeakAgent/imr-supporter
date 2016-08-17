mainApp.controller('assignTasksController', function($scope, $location, $http, $filter) {

    $scope.users = [
        {first_name: "Billy",
         last_name: "Bobson",
         pk: 1},
        {first_name: "Jodie",
         last_name: "Joson",
         pk: 2},
    ];

    $scope.tasks = [
        {title: "task one",
         pk: 5},
        {title: "task two",
         pk: 6}
    ]

    $scope.toAssign = {
        1: [],
        2: []
    }

    $scope.assignTask = function (user, task) {
        i = $scope.toAssign[user].indexOf(task)

        if (i == -1) {
            $scope.toAssign[user].push(task)
        } else {
            $scope.toAssign[user].pop(i)
        }
    }
})
