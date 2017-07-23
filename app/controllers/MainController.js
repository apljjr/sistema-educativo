module.exports = function($scope,$rootScope,$filter,configValue,routeInfo,$location,$timeout){
    var vm = $scope;
    var parent = $rootScope;

    vm.name = $filter("uppercase")(configValue.appName);
    vm.msg = "";
    vm.clients = [];
    vm.page = routeInfo.routeName;
    vm.navClass = routeInfo.navClass;
    vm.backgroundIMG = routeInfo.backgroundIMG;
    vm.login = true;
    vm.cadastrar = false;

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

    vm.viewCadastrar = function(){
        vm.cadastrar = true;
        vm.login = false;
    };

    vm.viewLogin = function(){
        vm.cadastrar = false;
        vm.login = true;
    }

    

};