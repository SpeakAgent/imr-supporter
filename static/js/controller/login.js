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

    $scope.$apply()
    $scope.User = User;
    $scope.User.username = null;

    var clearKeys = [
      'authToken',
      'username',
      'userProfile',
      'location.favorites',
    ];

    $window.location.href('/#');

  };

  $scope.getUserData = function(username) {
    user_req = {
      url: 'https://lexemes-dev.herokuapp.com/user/username/',
      method: 'POST',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      },
      data: {username: $scope.username}
    }
    console.log(user_req);
    return $http(user_req)
      .success(function(data) {
        console.log("User data on login", data)
        if (data.studentuser) {
          localStorage.setItem('first_name', data.studentuser.first_name)
          localStorage.setItem('last_name', data.studentuser.last_name)
          localStorage.setItem('score', data.studentuser.score)
          localStorage.setItem('user_type', 'student')
          $scope.userType = 'student'
        }
        if (data.authoruser) {
          localStorage.setItem('first_name', data.authoruser.first_name)
          localStorage.setItem('last_name', data.authoruser.last_name)
          localStorage.setItem('user_type', 'author')
          $scope.userType = 'author'
        }
      })
      .error(function (data) {
        $scope.errData = data
      });

    }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $scope.loading = true;
    $scope.loginData.username = $scope.loginData.username.toLowerCase();
    $scope.loginError = '';

    // Handle login
    var tokenAuthURL = 'https://lexemes-dev.herokuapp.com/api-token-auth/';
    console.log(tokenAuthURL);
    var responsePromise = $http.post(tokenAuthURL,
      {
        'username': $scope.loginData.username,
        'password': $scope.loginData.password
      });

    responsePromise.success(function(data, status, headers, config) {

        mixpanel.identify($scope.loginData.username);
        console.log(data)
        $rootScope.authToken = data.token;
        $rootScope.username = $scope.loginData.username;

        localStorage.setItem('authToken', $rootScope.authToken);
        localStorage.setItem('username', $rootScope.username);
        localStorage.setItem('startSession', getCurrentTime());


        //localStorage.setItem('previousSession', 'logging');
        // localStorage.setItem('score'), $rootScope.score;
        $http.defaults.headers.common.Authorization = 'Token ' + $rootScope.authToken;
        $scope.username = localStorage.getItem('username');
        $scope.authToken = localStorage.getItem('authToken');
        $scope.User = User;
        $scope.User.username = $scope.username;
        $rootScope.username = $scope.username;
        $scope.getUserData($scope.username).then(function(result) {
          if ($scope.userType == 'student') {
            $location.path('/dashboard');
          } else if ($scope.userType == 'author') {
            trackStart();
            $location.path('/author/');
          }
        })


    });

    responsePromise.error(function(data, status, headers, config) {
      $scope.loginError = "Unable to log in with the provided username and password.";
    });

  };
})