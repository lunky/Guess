﻿(function() {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontext', 'signalRSvc', dashboard]);

    function dashboard(common, datacontext, signalRSvc) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.guesser = {
            title: 'Guess',
            description: 'Guess - the app for guessing how long a task will take.'
        };
        vm.users = [];

        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';

        vm.clear = function() {
            signalRSvc.invoke("Clear");
        };

        signalRSvc.on('Guess', function (name, guess) {
            console.log("guess " + name + ' : ' + guess);
        });

        signalRSvc.on('GetUsers', function() {
            console.log("GetUsers");
            getLoggedInUsers();
        });

        activate();

        function activate() {
            var promises = [signalRSvc.start()];
            common.activateController(promises, controllerId)
                .then(function() {
                    log('Activated Dashboard View');
                });
        }

        function getLoggedInUsers() {
            signalRSvc.invoke('GetUsers', function (data) {
                console.log("users: " + data.length);
                vm.users = data;
            });
        }
    }
})();