
var MyApp = angular.module("MyApp", ['ngRoute', 'TaskManagerService']);

MyApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/Add', {
                templateUrl: 'Views/add.html',
                controller: 'AddController'
            }).
            when('/Edit', {
                templateUrl: 'Views/edit.html',
                controller: 'EditController'
            }).
            when('/Delete', {
                templateUrl: 'Views/delete.html',
                controller: 'DeleteController'
            }).
            when('/Home', {
                templateUrl: 'Views/home.html',
                controller: 'HomeController'
            }).
            otherwise({
                redirectTo: '/Home'
            });
    }]);

MyApp.controller("AddController", function ($scope, TaskApi) {

    $scope.addTask = function () {
        var taskToAdd = {
            'Task_Description': $scope.Task_Description,
            'Priority': $scope.Priority,
            'Parent_ID': $scope.Parent_ID,
            'Start_Date': $scope.Start_Date,
            'End_Date': $scope.End_Date
        };
        TaskApi.addTask(taskToAdd)
            .then(function (response) {
                alert("Task added successfully!!");
                $scope.Task_Description = undefined;
                $scope.Priority = 0;
                $scope.Parent_ID = undefined;
                $scope.Start_Date = undefined;
                $scope.End_Date = undefined;
            })       
    }

    $scope.resetTask = function () {
        $scope.Task_Description = undefined;
        $scope.Priority = 0;
        $scope.Parent_ID = undefined;
        $scope.Start_Date = undefined;
        $scope.End_Date = undefined;
    }
});

   
MyApp.controller("EditController", function ($scope) {

    $scope.message = "In Edit"

});


MyApp.controller("HomeController", function ($scope, TaskApi) {

    getTasks();

    function getTasks() {
        TaskApi.getTasks().then(function (tasks) {
            $scope.tasks = tasks.data;
        })
    }

    $scope.updateEndDate = function (task) {
        var taskToEdit = {
            'Task_Description': task.Task_Description,
            'Priority': task.Priority,
            'Parent_ID': task.Parent_ID,
            'Start_Date': task.Start_Date,
            'End_Date': new Date(),
            'Task_ID': task.Task_ID
        };

        TaskApi.editTask(taskToEdit).then(function (response) {
            alert('Task ended successfully!')
        });
    }

    $scope.editTask = function (task) {

    }


    //$scope.editTask = function (task) {
    //    var taskToEdit = {
    //        'Task_Description': task.Task_Description,
    //        'Priority': task.Priority,
    //        'Parent_ID': task.Parent_ID,
    //        'Start_Date': task.Start_Date,
    //        'End_Date': task.End_Date,
    //        'Task_ID': task.Task_ID
    //    };

    //    TaskApi.editTask(taskToEdit).then(function (response) {
    //        alert('Task ended successfully!')
    //    });
    //}
});