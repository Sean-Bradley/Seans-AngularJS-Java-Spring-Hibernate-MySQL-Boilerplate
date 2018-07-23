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

app.controller('birdsCtrl', function ($scope) {
    $scope.title = "Birds";
    //$scope.description = "Nothing to see here for birds, go back to cats instead.";
});
app.controller('catsCtrl', function ($scope, catsService, prettyPrint) {
    $scope.title = "Cats";
    $scope.description = "Managing Cat Data";
    $scope.catName = "";
    $scope.editing = [];  

    $scope.getCats = function () {
        try {
            catsService.get()
                .then(function (status) {
                    if (status.code === 1) {
                        $scope.items = status.data;
                        $scope.numberOfPages = function () {
                            return Math.ceil($scope.items.length / $scope.pageSize);
                        };
                    } else {
                        $scope.debugPanel = "Error\n" + prettyPrint(status);
                    }
                }), function (e) {
                    $scope.debugPanel = "Error\n" + prettyPrint(e);
                };
        } catch (e) {
            $scope.debugPanel = "Error\n" + prettyPrint(e);
        }
    }
    $scope.addCat = function () {
        try {
            catsService.add($scope.catName)
                .then(function (status) {
                    if (status.code === 1) {
                        $scope.debugPanel = status;
                        $scope.getCats();
                        $scope.catName = "";
                        $scope.addCatForm.$setPristine();
                    } else {
                        $scope.debugPanel = "Error\n" + prettyPrint(status);
                    }
                }, function (e) {
                    $scope.debugPanel = "Error\n" + prettyPrint(e);
                });
        } catch (e) {
            $scope.debugPanel = "Error\n" + prettyPrint(e);
        }
    };
    $scope.delete = function (_id) {
        try {
            catsService.delete(_id)
                .then(function (status) {
                    if (status.code === 1) {
                        $scope.getCats();
                    } else {
                        $scope.debugPanel = "Error\n" + prettyPrint(status);
                    }
                }, function (e) {
                    $scope.debugPanel = "Error\n" + prettyPrint(e);
                });
        } catch (e) {
            $scope.debugPanel = "Error\n" + prettyPrint(e);
        }
    }
    $scope.edit = function (_id) {
        try {
            $scope.editing[_id] = true;
        } catch (e) {
            $scope.debugPanel = "Error\n" + prettyPrint(e);
        }
    }
    $scope.update = function (_id, item) {
        try {
            catsService.update(_id, item)
                .then(function (status) {
                    if (status.code === 1) {
                        $scope.debugPanel = status;
                        $scope.editing[_id] = false;
                    } else {
                        $scope.debugPanel = "Error\n" + prettyPrint(status);
                    }
                }, function (e) {
                    $scope.debugPanel = "Error\n" + prettyPrint(e);
                });            
        } catch (e) {
            $scope.debugPanel = "Error\n" + prettyPrint(e);
        }
    }

    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.items = [];
    $scope.getCats(); //fills the items array

    $scope.range = function () {

        var rangeSize = 5;
        var ret = [];
        var start;

        start = $scope.currentPage;
        if (start > $scope.pageCount() - rangeSize) {
            start = $scope.pageCount() - rangeSize + 1;
        }

        for (var i = start; i < start + rangeSize; i++) {
            if (i >= 0) {
                ret.push(i);
            }
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function () {
        return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };

    $scope.nextPageDisabled = function () {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function (n) {
        $scope.currentPage = n;
    };


});
app.controller('clockCtrl', function ($scope, $interval) {
    $scope.theTime = new Date().toLocaleTimeString();
    $interval(function () {
        $scope.theTime = new Date().toLocaleTimeString();
    }, 1000);
});
app.controller('dogsCtrl', function ($scope) {
    $scope.title = "Dogs";
    //$scope.description = "Nothing to see here for dogs, go back to cats instead.";
});
app.controller('homeCtrl', function ($scope) {
    // $scope.title = "Home";
    //$scope.description = "Nothing to see here, go and see !#cats instead.";
});
app.controller('navbarCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});
app.directive('seansFooter', function () {
    return {
        template: "<footer class='footer'><div class='container'><span class='text-muted'>You can download this project from my github project page at <a href='https://github.com/Sean-Bradley/Seans-AngularJS-Java-Spring-Hibernate-MySQL-Boilerplate' target='_blank'>https://github.com/Sean-Bradley/Seans-AngularJS-Java-Spring-Hibernate-MySQL-Boilerplate</a></span></div></footer>"
    };
});
app.filter('offset', function() {
    return function(input, start) {
      start = parseInt(start, 10);
      return input.slice(start);
    };
  });
app.service('catsService', ['$http', function ($http) {
    this.get = function () {
        return $http.get("api/cats")
            .then(function (response) {
                return { "code": 1, "data": response.data };
            }, function (e) {
                return { "code": -1, "data": e };
            });
    }
    this.add = function (catName) {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
        }
        return $http.post("api/cats", JSON.stringify({ "name": catName }), config)
            .then(function (response, status, headers, config) {
                return { "code": 1, "data": response };
            }, function (e) {
                return { "code": -1, "data": e };
            });
    }
    this.delete = function (_id) {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
        }
        return $http.delete("api/cats/" + _id, null, config)
            .then(function () {
                return { "code": 1 };
            }, function (e) {
                return { "code": -1, "data": e };
            });
    }
    this.update = function (_id, item) {
        return $http.put("api/cats/" + _id, item)
            .then(function (response) {
                return { "code": 1, "data": response };
            }, function (e) {
                return { "code": -1, "data": e };
            });
    }
}]);
app.service('prettyPrint', function () {
    return function (o) {
        var r = "";
        for (var p in o) {
            r += p + " : " + o[p] + "\n";
        }
        return r;
    }
});