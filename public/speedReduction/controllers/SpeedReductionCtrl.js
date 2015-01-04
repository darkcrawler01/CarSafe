'use strict';

angular.module('app')

  .controller('SpeedReductionCtrl', function ($scope, $alert, $location) {
  	$scope.onReportClose = function(reportType) {
        console.log("report " + reportType + " closed");
    };

    $scope.reportThankUser = function() {
    	$alert.show({
            type: "success",
            showIcon: "true",
            autoCloseInterval: "3000",
            title: "Thank You",
            text: "You are making the road a safer place."
        });
    };

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
		  default:
		  	console.log("something went wrong.. report type not found");
		    break;
		}

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
    };

    $scope.title = 'Report Issue';
    $scope.reductions = [
        {
        	id: 'recklessDriver',
            text: 'Reckless Driver',
            desc: 'Reckless driver nearby.',
            callback: function(){
                console.log(drive.navigation.position.get());
            	drive.notification.messages.set({"data" : drive.navigation.position.get()});
            	$location.path("#/homePage");
            	// $scope.reportAlertUser('recklessDriver');
            	$scope.reportThankUser();
            }
        },
        {
            id: 'roadHazard',
            text: 'Road Hazard',
            desc: 'Road hazard nearby.',
            callback: function(){
            	drive.notification.messages.set({"data" : drive.navigation.position.get()});
            	$location.path("#/homePage");
            	// $scope.reportAlertUser('roadHazard');
            	$scope.reportThankUser();
            }
        },
        {
            id: 'heavyTraffic',
            text: 'Heavy Traffic',
            desc: 'Heavy traffic nearby.',
            callback: function(){
            	drive.notification.messages.set({"data" : drive.navigation.position.get()});
            	$location.path("#/homePage");
            	// $scope.reportAlertUser('heavyTraffic');
            	$scope.reportThankUser();
            }
        }
    ];

});