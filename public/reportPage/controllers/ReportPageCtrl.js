﻿'use strict';

angular.module('app')
  .controller('ReportPageCtrl', ["$scope", function ($scope) {

  }])

  .controller('ReportPageCtrl', function ($scope, $alert, $location) {
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

    // $scope.getPosition = function(position){
    //     console.log("pushing alert");
    //     // drive.notification.messages.set({"data" : position.latitude+","+position.longitude});
        
    // };

    $scope.logError = function(error){
        console.log(error);
    };

    $scope.reports = [
        {
        	id: 'recklessDriver',
            text: 'Reckless Driver',
            desc: 'Reckless driver nearby.',
            callback: function(){
                jQuery.ajax({
                    method:"POST",
                    url:"http://rest.sharethis.com/v1/share/share",
                    data:{"destination" : "Facebook", "url" : "www.sharethis.com", "api_key" : "3a3nqvrffdhrgjt973rbrsdn"},
                    success:function(result){
                        console.log("sucess");
                        console.log(result);
                    }
                });

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
            	drive.navigation.position.get().then($scope.getPosition, $scope.logError);
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
            	drive.navigation.position.get().then($scope.getPosition, $scope.logError);
            	$location.path("#/homePage");
            	// $scope.reportAlertUser('heavyTraffic');
            	$scope.reportThankUser();
            }
        }
    ];

});