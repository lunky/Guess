'use strict';
// The Jasmine Test Framework
/// <reference path="lib/jasmine.css"/>
/// <reference path="lib/jasmine.js"/>
/// <reference path="lib/jasmine-html.js"/>
/// <reference path="lib/jasmine-2.0.0/jasmine-html.js"/>
/// <reference path="lib/jasmine-2.0.0/boot.js"/>

/// <reference path="../Scripts/jquery-2.1.1.js" />

/// <reference path="../Scripts/angular.js"/>
/// <reference path="../Scripts/angular-mocks.js"/>

// Classes to test
/// <reference path="app/app.js"></reference>
/// <reference path="app/guess/guess.js"></reference>


describe("Guess Controller Tests", function() {
    var dc;
    var scope;
    var datacontext = {};
//    var signalRSvc = jasmine.createSpyObj('signalRSvc', ['signalRSvc']);

    beforeEach(function() {
        module('app');       // sanitizes html bindings (ex: sidebar.js)
    });

    beforeEach(function() {
        angular.mock.inject(function($rootScope, $controller, common, signalRSvc) {
            scope = $rootScope.$new();
            dc = $controller('dashboardCtrl', {
                'common': common,
                'datacontext': datacontext,
                'signalRSvc': signalRSvc
            });
        });
    });


    it('should create a contoller', function () {
        expect(dc).toBeDefined();
    });
    //it("calls start on signalr service", inject([') ' +
    //       function dashboard(common, datacontext, signalRSvc)
    //    '' +
    //    'function () {

    //});
});