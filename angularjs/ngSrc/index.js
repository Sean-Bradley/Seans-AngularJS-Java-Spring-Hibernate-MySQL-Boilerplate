var app = angular.module('seansApp', ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/cats", {
            templateUrl: "views/catsView.html"
        })
        .when("/dogs", {
            templateUrl: "views/dogsView.html"
        })
        .when("/birds", {
            templateUrl: "views/birdsView.html"
        })
        .otherwise({
            templateUrl: "views/homeView.html"
        });

});
