"use strict";

var app = angular.module('app', [
    'ngRoute',
    'connectedCarSDK'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/homePage', {
            templateUrl: 'homePage/views/homePage.html',
            controller: 'HomePageCtrl',
            settings: {
                viewName: 'Home',
            }
        })
        .when('/reportPage', {
            templateUrl: 'reportPage/views/reportPage.html',
            controller: 'ReportPageCtrl',
            settings: {
                viewName: 'Report a Hazard',
            }
        })
        .when('/speedReduction', {
            templateUrl: 'speedReduction/views/speedReduction.html',
            controller: 'SpeedReductionCtrl',
            settings: {
                viewName: 'Speed Reduction',
            }
        })
        .otherwise({
            redirectTo: '/homePage'
        });
});

// AT&T DRIVE DEC INIT
function initDec() {
    $rootScope.decInstance = {};
    window.DecInstanceConstructor = function (inputParam) {
        var input = inputParam;
        var isOnline = input && input.successCode == '0';

        function getSuccessObject() {
            return isOnline ? input : null;
        }

        function getErrorObject() {
            return !isOnline ? input : null;
        }

        function status() {
            var returnObj = {};

            returnObj.status = isOnline ? 'success' : 'error';
            returnObj.message = isOnline ? input.successMessage : input.errorMessage;
            returnObj.code = isOnline ? input.successCode : input.errorCode;

            return returnObj;
        }

        return {
            isOnline: isOnline,
            status: status,
            getSuccessObject: getSuccessObject,
            getErrorObject: getErrorObject
        };
    };

    function decCallback(decResponse) {
        $rootScope.decInstance = new DecInstanceConstructor(decResponse);

        //decSetSubscriptions();
        socket.on('warning', function(msg){
            console.error("received" + msg);
            console.log(msg);
            msg = JSON.parse(msg);
            if (uniqueID != msg.ID){
                jQuery(document).trigger("alertTrigger", [msg.data]);
            }
        });
        socket.on('speed', function(msg){
            console.error("speeed &****************" + msg);
            console.error(msg);
            msg = JSON.parse(msg);
            if (uniqueID != msg.ID){
                jQuery(document).trigger("speedTrigger", [msg.data]);
            }
        });
    };

    try {
        // DO NOT REMOVE THE BELLOW COMMENT - used for grunt build process
        init(decCallback, ["appmanager", "commerce", "connectivity", "identity", "media", "navigation", "notification", "policy", "sa", "search", "settings", "sms", "va", "vehicleinfo"], 'CarSafe');
    } catch (e) {
        $rootScope.decInstance = new DecInstanceConstructor({
            "errorCode": e.code,
            "errorMessage": e.message,
            "thrownError": e
        });
    }
}

app.run(function ($rootScope) {
    window.$rootScope = $rootScope;
    initDec();

    $rootScope.appName = 'CarSafe';
    $rootScope.showDrawer = true;

    $rootScope.$on('$routeChangeSuccess',
        function (event, next, current) {
            $rootScope.showDrawer = false;

            $rootScope.$broadcast('changeDrawer', [false]);

            if (next && next.$$route && next.$$route.settings) {
                $rootScope.viewName = next.$$route.settings.viewName;
            }
        });

    $rootScope.appLinks = [
        { text: 'Home', desc: 'Home page', href: '#/homePage', selected: true },
        { text: 'Report', desc: 'Report page', href: '#/reportPage', selected: false },
        { text: 'Speed Reduction', desc: 'Speed Reduction', href: '#/speedReduction', selected: false }
    ];
});
