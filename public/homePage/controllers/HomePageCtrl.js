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
            try
            {
                
            var aud = new Audio('/audio/reckless.wav');
            aud.play();
            }
            catch(e) 
            {
                console.error(e);
            }
            break;
          case "roadHazard":
            reportText = "Road hazard nearby!";
            try
            {

            var aud = new Audio('/audio/hazard.wav');
            aud.play();
            }
            catch(e) 
            {
                console.error(e);
            }
            break;
          case "heavyTraffic":
            reportText = "Heavy traffic nearby!";
            try
            {

            var aud = new Audio('/audio/heavy.wav');
            aud.play();
            }
            catch(e) 
            {
                console.error(e);
            }
            break;
          case "speed":
            reportText = "Sudden slowdown in traffic speed.";
            try
            {

            var aud = new Audio('/audio/speed.wav');
            aud.play();
            }
            catch(e) 
            {
                console.error(e);
            }
            break;
          default:
            console.log("something went wrong.. report type not found");
            break;
        }

        if (reportType != "speed"){
            $alert.show({
                type: "danger",
                showIcon: "true",
                showConfirmationBtn: "true",
                buttonText: "Thanks",
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

        jQuery(document).on("alertTrigger", function(e, params){
            $scope.reportAlertUser(params);
        });

        jQuery(document).on("speedTrigger", function(e, params){
            $scope.reportAlertUser(params);
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
        
        if (globalData != null && parseInt(globalData.split(":")[2].split("}")[0]) <= 10){
            socket.emit('crash', JSON.stringify({"ID": uniqueID, "data" : "crash"}));
            clearInterval(tmpInterval);
            console.error("crash");
        } else if (globalData != null && parseInt(globalData.split(":")[2].split("}")[0]) <= 25){
            socket.emit('speed', JSON.stringify({"ID": uniqueID, "data" : "speed"}));
            clearInterval(tmpInterval);
            console.error("speed");
        }
        
    }, 100);

});    

  