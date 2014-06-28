(function() {
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

        activate();

        function activate() {
            var promises = [signalRSvc.start(), getLoggedInUsers()];
            common.activateController(promises, controllerId)
                .then(function() {
                    log('Activated Dashboard View');
                });
        }

        function getLoggedInUsers() {
            signalRSvc.invoke('GetUsers', function (data) {
                log.console(data.length());
                vm.users = data;
            });
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

        function getPeople() {
            return datacontext.getPeople().then(function (data) {
                return vm.people = data;
            });
        }
    }
})();