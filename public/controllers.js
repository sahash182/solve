/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {
    //check if logged in
    $scope.$watch( Auth.isLoggedIn, function ( isLoggedIn ) {
      $scope.isLoggedIn = isLoggedIn;
      $scope.currentUser = Auth.currentUser();
      console.log($scope.currentUser);
    })
    // LOGOUT 
    $scope.logout = function() {
      localStorage.removeItem('jwtToken');
      $location.path('/login')
      $scope.isLoggedIn = false;
    }

    // var currentUser;
    // // CHECK IF LOGGED IN (IF JWT TOKEN PRESENT)
    // $scope.isLoggedIn = Auth.isLoggedIn();
    // //current User
    // $scope.currentUser = Auth.currentUser();
    // console.log(currentUser);

    // ON LOGIN UPDATE NAVBAR
    $rootScope.$on('loggedIn', function () {
      $scope.isLoggedIn = true
    })
  }])

  .controller('SignUpCtrl', function ($rootScope, $scope, User, $location, Auth) {
    $scope.user = {};
    $scope.signup = function() {
      console.log($scope.user)
      console.log('signing up')
      User.sign_up({}, $scope.user,
        function (data) {
          console.log(data.token)
          localStorage.setItem("jwtToken", data.token);
          $rootScope.$broadcast('loggedIn'); // TELL THE OTHER CONTROLLERS WE'RE LOGGED IN
          $location.path('/');
        },
        function (data) {
          var message = "Invalid Email or Password"
          console.log(message)
        }
      );
    };
  })


  .controller('LoginCtrl', function ($rootScope, $scope, User, $location, Auth) {
    $scope.user = {};
    $scope.login = function() {
      console.log($scope.user)
      console.log('logging in')
      User.login({}, $scope.user,
        function (data) {
          console.log(data.token)
          localStorage.setItem("jwtToken", data.token);
          $rootScope.$broadcast('loggedIn'); // TELL THE OTHER CONTROLLERS WE'RE LOGGED IN
          $location.path('/profile');
        },
        function (data) {
          var message = "Invalid Email or Password"
          console.log(message)
        }
      );
    };
  })

  // //Profile
  //   .controller('ProfileCtrl', function ($rootScope, $scope, User, $location, Auth) {
  //   $scope.currentUser = Auth.currentUser();
  //   console.log(currentUser);
    
  // })


  //User
  .controller('UsersIndexCtrl', function ($scope, $location, User, Auth) {
    User.query(
      function(data) {
        $scope.users = data
      },
      function(data) {
        $location.path('/');
      }
    );

    $scope.todo = {};
    $scope.createTodo = function() {
      Post.save($scope.todo, 
        function(data){
          $scope.todos.push(data);
        },
        function(data) {
          alert("there was a problem saving your todo");
        }
      );
      $scope.todo = '';
    }

    $scope.deleteTodo = function(todo) {
      Post.delete({ id: todo._id });
      var index = $scope.todos.indexOf(todo)
      $scope.todos.splice(index, 1);
    }
  });