'use strict';

angular.module('ponyApp').controller('TownController', ['$scope', '$route', 'TimeService', function($scope, $route, TimeService) {
  $scope.buttonText = "Start";
  
  $scope.start = function() {
    if (TimeService.isPaused()) {
      self.buttonText = "Pause";
      TimeService.unpause();
      TimeService.start();
    }
    else {
      self.buttonText = "Unpause";
      TimeService.pause();
    }
  }
  
  $scope.dash ="Rainbow Dash";
  $scope.pinkie = "Not <a href=\"http://google.com/\">Pinkie Pie</a> a link";
  $scope.rect = "1===o====o====o====o====o====o====o====o====0\n" +
                "2                                          |\n" +
                "3                                          |\n" +
                "4                                          |\n" +
                "5                                          |\n" +
                "6                                          |\n" +
                "7                                          |\n" +
                "8                                          |\n" +
                "9                                          |\n" +
                "10                                         |\n" +
                "11                                         |\n" +
                "12                                         |\n" +
                "13                                         |\n" +   
                "14                                         |\n" +
                "15                                         |\n" //+  
                //"16                                         |\n";
}]);
