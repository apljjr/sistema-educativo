module.exports = function($scope,$rootScope,$filter,configValue,routeInfo,$location,$uibModal){
    var vm = $scope;

    vm.name = $filter("uppercase")(configValue.appName);
    vm.msg = "";
    vm.clients = [];
    vm.page = routeInfo.routeName;
    vm.navClass = routeInfo.navClass;

    $rootScope.navActive = false;

    vm.viewProfessor = function(){
        $location.path('/professor');
        $scope.$apply();
    };

    vm.viewAluno = function(){
        $location.path('/aluno');
        $scope.$apply();
    };

    

};