module.exports = function($scope,$rootScope,$filter,clientAPIService,configValue,routeInfo,$routeParams, $http, $sce){
    
    var vm = $scope;
    $rootScope.navActive = true;
    
    vm.name = $filter("uppercase")(configValue.appName);
    vm.msg = "";
    vm.clients = [];
    vm.page = routeInfo.routeName;
    vm.navClass = routeInfo.navClass;

    $rootScope.navActive = true;

    vm.clickResposta = function(value){
      if(value === 1){
        vm.resp1 = true;
        vm.resp2 = false;
        vm.resp3 = false;
        vm.resp4 = false;
      }else if(value === 2){
        vm.resp1 = false;
        vm.resp2 = true;
        vm.resp3 = false;
        vm.resp4 = false;
      }else if(value === 3){
        vm.resp1 = false;
        vm.resp2 = false;
        vm.resp3 = true;
        vm.resp4 = false;
      }else if(value === 4){
        vm.resp1 = false;
        vm.resp2 = false;
        vm.resp3 = false;
        vm.resp4 = true;
      }
    };

};