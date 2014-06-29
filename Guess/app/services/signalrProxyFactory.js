'use strict';
var proxyApp = angular.module("app.signalrProxyFactory", []);



// The same as a service (used as singleton)
proxyApp.service('signalRSvc', function ($, $q, $rootScope) {

    var proxy = null;
    var connection = null;
    var hubName = 'GuessHub';

    //Getting the connection object
    connection = $.hubConnection();

    //Creating proxy
    proxy = connection.createHubProxy(hubName);

    // handle reconnection
    var reconnectCallbackDictionary = {};
    connection.reconnected(function () {
        console.log("Connection restored!");
        for (var key in reconnectCallbackDictionary) {
            $rootScope.$apply(reconnectCallbackDictionary[key]);
        }
    });


    var start = function () {
        var promise = connection.start();
        promise.done(function () {
            console.log("Connection (svc) created to " + hubName);
        });
        return $q.when(promise);
    };

    var stop = function () { connection.stop(); };

    var on = function (eventName, callback) {
        proxy.on(eventName, function (result) {
            $rootScope.$apply(function () {
                if (callback) {
                    callback(result);
                }
            });
        });
        // re-arm connection
    //    stop();
    //    start();
    };
    var off = function (eventName, callback) {
        proxy.off(eventName, function (result) {
            $rootScope.$apply(function () {
                if (callback) {
                    callback(result);
                }
            });
        });
    };
    var invoke = function (methodName, callback) {
        var promise = proxy.invoke(methodName);
        promise.done(function (result) {
                $rootScope.$apply(function () {
                    if (callback) {
                        callback(result);
                    }
                });
        });
        return $q.when(promise);
    };


    var onReconnect = function (callbackId, callback) {

        // insert to dictionary
        reconnectCallbackDictionary[callbackId] = callback;
        //         
        //connection.reconnected(callback);

    };

    return {
        //initialize: initialize,
        start: start,
        stop: stop,
        on: on,
        off: off,
        invoke: invoke,
        onReconnect: onReconnect,
    };
});