var myApp=angular.module( 'myApp', [] );
myApp.controller( 'whereMyPeeps', [ '$scope', '$http', function( $scope, $http ){
  var allTheRecords;

  $scope.addRecord = function(){
    event.preventDefault();
    var objectToSend ={
      name: $scope.nameIn,
      location: $scope.locationIn,
    };
    $http({
      method: 'POST',
      url: '/addRecords',
      data: objectToSend
    });
    $scope.nameIn ='';
    $scope.locationIn='';
  };

  $scope.getRecords = function(){
    $http({
      method: 'GET',
      url: '/getRecords',
    }).then( function( response ){
      $scope.allTheRecords = response.data;
      allTheRecords = $scope.allTheRecords;
      console.log( $scope.allTheRecords );
    }, function myError( response ){
      console.log( response.statusText );
    });
  };

  $scope.deleteRecord = function(recordNum){
    var idToDelete = {
          id: allTheRecords[recordNum]._id
        };

    $http({
      method: 'DELETE',
      url: '/deleteRecords',
      data: idToDelete,
      headers: {"Content-Type": "application/json;charset=utf-8"}
    }).then( function( response ){
      $scope.getRecords();
    }, function myError( response ){
      console.log( response.statusText );
    });
  };
}]);
