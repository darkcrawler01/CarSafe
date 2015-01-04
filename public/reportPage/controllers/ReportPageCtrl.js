'use strict';

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

    $scope.getPosition = function(position){
        console.log("pushing alert");

        socket.emit('warning', JSON.stringify({"ID": uniqueID, "data" : position.latitude+","+position.longitude}));
        console.error("sent");
        // drive.notification.messages.set({"data" : position.latitude+","+position.longitude});
        
    };

    $scope.logError = function(error){
        console.log(error);
    };

    $scope.reports = [
        {
        	id: 'recklessDriver',
            text: 'Reckless Driver',
            desc: 'Reckless driver nearby.',
            callback: function(){
                console.error("testing");
                socket.emit('warning', JSON.stringify({"ID": uniqueID, "data" : "recklessDriver"}));
                // drive.navigation.position.get().then($scope.getPosition, $scope.logError);

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
            	socket.emit('warning', JSON.stringify({"ID": uniqueID, "data" : "roadHazard"}));
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
            	socket.emit('warning', JSON.stringify({"ID": uniqueID, "data" : "heavyTraffic"}));
            	$location.path("#/homePage");
            	// $scope.reportAlertUser('heavyTraffic');
            	$scope.reportThankUser();
            }
        }
    ];

    jQuery(document).on("alertTrigger", function(e, params){
        $scope.reportAlertUser(params);
    });

    jQuery(document).on("speedTrigger", function(e, params){
        $scope.reportAlertUser(params);
    });

});