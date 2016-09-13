mainApp.controller('loginController', function($scope, $http,
  $rootScope, jwtHelper, $location){
  // Form data for the login modal
  $scope.loading = false;
  $scope.loginData = {};
  $scope.authToken = localStorage.getItem('authToken');
  if ($scope.authToken) {
    $scope.username = jwtHelper.decodeToken($scope.authToken).username;
  }

  // Perform logout
  $scope.doLogout = function(data, status, headers, config) {
    console.log("Log out!")
    $rootScope.authToken = null;
    $scope.authToken = null;
    $scope.username= null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('pk');

    $scope.$apply()

    var clearKeys = [
      'authToken',
      'username',
      'userProfile',
      'location.favorites',
    ];

    $window.location.href('/#');

  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log("Logging in...")
    $scope.loading = true;
    $scope.loginError = '';

    // Handle login
    var tokenAuthURL = 'http://iamready.herokuapp.com/api-token-auth/';
    console.log(tokenAuthURL);
    console.log($scope.loginData)
    var responsePromise = $http.post(tokenAuthURL,
      {
        'username': $scope.loginData.username,
        'password': $scope.loginData.password
      });

    responsePromise.success(function(data, status, headers, config) {

        console.log(data)
        $rootScope.authToken = data.token;
        $rootScope.username = $scope.loginData.username;

        localStorage.setItem('authToken', $rootScope.authToken);
        localStorage.setItem('username', $rootScope.username);


        //localStorage.setItem('previousSession', 'logging');
        // localStorage.setItem('score'), $rootScope.score;
        $http.defaults.headers.common.Authorization = 'Token ' + $rootScope.authToken;
        $scope.username = localStorage.getItem('username');
        $scope.authToken = localStorage.getItem('authToken');
        $rootScope.username = $scope.username;

        var ureq = {
          url: "http://iamready.herokuapp.com/users/supporters/one/",
          data: {
            username: $scope.username,
          },
          method: "POST",
          headers: {
              Authorization: 'JWT ' + localStorage.getItem('authToken')
          }
        }

        $http(ureq).success(function(data) {
          console.log(data)
          localStorage.setItem('pk', data.pk);
          $location.path('/dashboard');
        })

    });

    responsePromise.error(function(data, status, headers, config) {
      $scope.loginError = "Unable to log in with the provided username and password.";
    });

  };
})