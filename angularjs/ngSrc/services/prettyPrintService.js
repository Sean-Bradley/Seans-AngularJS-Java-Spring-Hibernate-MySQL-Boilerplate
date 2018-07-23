app.service('prettyPrint', function () {
    return function (o) {
        var r = "";
        for (var p in o) {
            r += p + " : " + o[p] + "\n";
        }
        return r;
    }
});