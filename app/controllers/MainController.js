module.exports = function($scope,$rootScope,$filter,configValue,routeInfo,$location,$timeout){
    var vm = $scope;

    vm.name = $filter("uppercase")(configValue.appName);
    vm.msg = "";
    vm.clients = [];
    vm.page = routeInfo.routeName;
    vm.navClass = routeInfo.navClass;

    $rootScope.navActive = false;

    vm.viewProfessor = function(){
        $timeout( function(){
            $location.path('/professor');
        }, 200 );
    };

    vm.viewAluno = function(){
         $timeout( function(){
            $location.path('/aluno');
        }, 500 );
    };

    

};