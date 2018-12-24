/// <reference path="scripts/angular.js" />

var TaskManagerService = angular.module('TaskManagerService', []);

TaskManagerService.factory('TaskApi', function ($http) {

    var urlBase = "http://localhost:57071/api";
    var TaskApi = {};


    TaskApi.getTasks = function()
    {
        var url = urlBase + '/tasks';
        var result = $http.get(url);
        return result;
    };

    TaskApi.addTask = function (task) {
        var url = urlBase + '/tasks';
        return $http.post(url, task);        
    };

    TaskApi.editTask = function (task) {
        var url = urlBase + '/tasks/' + task.Task_ID;
        return $http.put(url, task);
    };

    return TaskApi;
});