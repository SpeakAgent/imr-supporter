mainApp.controller('profilesController', function($scope, $http) {
    console.log("profiles Controller");


    var req = {
        url: "http://iamready.herokuapp.com/users/user/all/",
        method: "POST",
        data: {
            mode: "simple"
        },
        headers: {
            Authorization: 'JWT ' + localStorage.getItem('authToken')
        },
    }

    $http(req).success(function(data) {
        $scope.students = data
    })
});

mainApp.controller('profileController', function($scope, $http, $stateParams, $window) {
    console.log("profiles Controller");

    $scope.formData = {}

    var req = {
        url: "http://iamready.herokuapp.com:80/users/user/one/",
        method: "POST",
        data: {
            pk: $stateParams.pk
        },
        headers: {
            Authorization: 'JWT ' + localStorage.getItem('authToken')
        },
    }

    $http(req).success(function(data) {
        $scope.student = data
    })

    $scope.updateProfile = function () {
        var profile_data = {'pk': $stateParams.pk};

        var profile_fields = ['street', 'city', 'zip', 'school', 'work', 
            'stuff_i_like'];

        for (var i in profile_fields) {
            if (profile_fields[i] in $scope.formData) {
                profile_data[profile_fields[i]] = $scope.formData[profile_fields[i]]
            }
        }

        console.log(profile_data);

        var preq = {
            url: "http://iamready.herokuapp.com/users/user/update/",
            data: profile_data,
            method: "POST",
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('authToken')
            },
        }

        $http(preq).success(function(data){
            $scope.student = data
            $window.location.href = "#/profiles";
        })
        .error(function(data){

        })
    }

    $scope.updateEmergency = function () {
        console.log($scope.formData);
        var emer_fields = ['medical', 'at_school', 'at_work', 
            'should_know'];
        var emer_data = {pk: $scope.student.pk};

        console.log(emer_fields, $scope.formData)

        for (var i in emer_fields) {
            if (emer_fields[i] in $scope.formData) {
                emer_data[emer_fields[i]] = $scope.formData[emer_fields[i]]
            }
        }

        console.log(emer_data)

        var emer_con_fields = ['name', 'relationship', 'phone']
        if ('em' in $scope.formData) {
            if ($scope.formData.em[0] != undefined) {
                c1arr = [$scope.student.emergency_contacts[0].pk]
                for (var i in emer_con_fields) {
                    if (emer_con_fields[i] in $scope.formData.em[0]) {
                        c1arr.push($scope.formData.em[0][emer_con_fields[i]])
                    } else {
                        c1arr.push("#")
                    }
                }
    
                emer_data.em1 = c1arr.join("::");
    
            }
    
            if ($scope.formData.em[1] != undefined) {
                c2arr = [$scope.student.emergency_contacts[1].pk]
                for (var i in emer_con_fields) {
                    if (emer_con_fields[i] in $scope.formData.em[1]) {
                        c2arr.push($scope.formData.em[1][emer_con_fields[i]])
                    } else {
                        c2arr.push("#")
                    }
                }
    
                emer_data.em2 = c2arr.join("::");
    
            }}

        var ereq = {
            url: "http://iamready.herokuapp.com/users/user/update/",
            data: emer_data,
            method: "POST",
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('authToken')
            },
        }

        console.log(ereq);

        $http(ereq).success(function(data){
            $scope.student = data;
            $window.location.href = "#/profiles";
        })
        .error(function(data){
            console.log(data)
        })


    }


});
