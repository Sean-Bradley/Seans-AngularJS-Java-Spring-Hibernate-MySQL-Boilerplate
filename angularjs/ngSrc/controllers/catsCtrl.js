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