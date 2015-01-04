'use strict';

angular.module('app')

  .controller('HomePageCtrl', function ($scope, $alert, $location) {
        // $rootScope.$watch('decInstance.isOnline', function(value){
        //     $scope.isDecOnline = value;
        // });

        $scope.moveToSpeedReduction = function() {
            location.href = "#/speedReduction";
        }


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

    // var tmpInterval = setInterval(function(){
    //     if (parseInt(globalData.split(":")[2].split("}")[0]) <= 10){
    //         alert("CRASH");
    //     } else if (parseInt(globalData.split(":")[2].split("}")[0]) <= 25){
    //         clearInterval(tmpInterval);
    //         moveToSpeedReduction();
    //     }
    // }, 100);

});    

  