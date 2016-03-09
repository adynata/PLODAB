(function() {

  angular.module('plodab', [])
    .controller('chartctrl', ['$scope', function ($scope) {

      $scope.name = "Basdjfjkl;ashfakljhs";

      $scope.booksubjects = [
              {topic: "Subjects", name: "Feminism", count: 12},
              {topic: "Subjects", name: "Emigration and Immigration", count: 5},
              {topic: "Subjects", name: "Latin America", count: 10},
              {topic: "Subjects", name: "Identity", count: 10},
              {topic: "Subjects", name: "Gender Studies", count: 8},
              {topic: "Subjects", name: "Public Opinion", count: 1},
              {topic: "Subjects", name: "Music in Art", count: 3},
              {topic: "Subjects", name: "Race in America", count: 2},
      ];

    }]);

})();
