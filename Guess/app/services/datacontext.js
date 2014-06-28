(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', datacontext]);

    function datacontext(common) {
        var $q = common.$q;

        var service = {
            getLoggedInUsers: getLoggedInUsers
        };

        return service;

        function getLoggedInUsers() {
            var users = [
                { handle: "quinn" }
            ];
            return $q.when(users);
        }

    }
})();