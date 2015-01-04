'use strict';

angular.module('app')

  .controller('HomePageCtrl', function ($scope, $alert, $location) {
        // $rootScope.$watch('decInstance.isOnline', function(value){
        //     $scope.isDecOnline = value;
        // });

        $scope.moveToSpeedReduction = function() {
            location.href = "#/speedReduction";
        }

        $scope.reportAlertUser = function(reportType) {
        var reportText;

        switch (reportType) {
          case "recklessDriver":
            reportText = "Reckless driver nearby!";
            break;
          case "roadHazard":
            reportText = "Road hazard nearby!";
            break;
          case "heavyTraffic":
            reportText = "Heavy traffic nearby!";
            break;
          case "slowdown":
            reportText = "Sudden slowdown in traffic speed.";
            break;
          default:
            console.log("something went wrong.. report type not found");
            break;
        }

        if (reportType == "slowdown"){
            $alert.show({
                type: "danger",
                showIcon: "true",
                showConfirmationBtn: "true",
                buttonText: "Thanks",
                onClose: $scope.onReportClose(reportType),
                autoCloseInterval: "false",
                title: "Attention",
                text: reportText
            });
        } else {
            $alert.show({
                type: "info",
                showIcon: "true",
                showConfirmationBtn: "false",
                autoCloseInterval: "3000",
                title: "Caution",
                text: reportText
            });
        }
    };

        jQuery(document).on("alertTrigger", params, function(){
            $scope.reportAlertUser(params[0]);
        });

        jQuery(document).on("speedTrigger", function(){
            $scope.reportAlertUser('slowdown');
        });


        // var deregisterPositionWatch = $rootScope.$watch('position', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the position namespace: ', value);
        //     $scope.position = $rootScope.position;
        // });

        // var deregisterFuelWatch = $rootScope.$watch('fuel', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the fuel namespace: ', value);
        //     $scope.fuel = $rootScope.fuel;

        // });

        // var deregisterIdentificationWatch = $rootScope.$watch('identification', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the identification namespace: ', value);
        //     $scope.identification = $rootScope.identification;
        // });

        // $scope.fuel = {
        //     "level": 100
        // }
        // $scope.identification = {
        //     "vin": "112233",
        //     "model": "S60",
        //     "brand": "Volvo"
        // };

        // $scope.position = {
        //     "latitude": 1.1,
        //     "longitude": 2.2,
        //     "altitude": "3",
        //     "heading": "4.4",
        //     "precision": "",
        //     "velocity": "5"
        // }

        // $scope.$on('$destroy', function () {
        //     //stop watching when scope is destroyed
        //     if (deregisterPositionWatch) deregisterPositionWatch();
        //     if (deregisterFuelWatch) deregisterFuelWatch();
        //     if (deregisterIdentificationWatch) deregisterIdentificationWatch();
        // });

    var tmpInterval = setInterval(function(){
        if (parseInt(globalData.split(":")[2].split("}")[0]) <= 10){
            socket.emit('crash', JSON.stringify({"ID": uniqueID, "data" : "crash"}));
        } else if (parseInt(globalData.split(":")[2].split("}")[0]) <= 25){
            socket.emit('speed', JSON.stringify({"ID": uniqueID, "data" : "speed"}));
        }
    }, 100);

});    

  