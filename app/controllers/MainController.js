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

    vm.alertaLoginProfessor = false;
    vm.alertaTokenAluno = false;

    vm.viewProfessor = function(){

        var user = document.getElementById("userProfessor").value;
        var key = document.getElementById("passProfessor").value;

        if(user === 'eduq' && key === 'eduq'){

            parent.userProfessor = user;
            vm.alertaLoginProfessor = false;
            $('#professorModal').modal('hide');

            $timeout( function(){
                $location.path('/professor');
            }, 200 );

        }else{

            vm.alertaLoginProfessor = true;

        }     
    };

    vm.viewAluno = function(){

        var name = document.getElementById("nameAluno").value;
        var token = document.getElementById("tokenAluno").value;

        if(token === '123'){

            parent.nomeAluno = name;
            parent.token = token;
            vm.alertaTokenAluno = false;
            $('#alunoModal').modal('hide');

             $timeout( function(){
                $location.path('/aluno');
            }, 500 );

        }else{

            vm.alertaTokenAluno = true;
            
        }
    };

    vm.closeModalAluno = function(){

        vm.alertaTokenAluno = false;
        $('#alunoModal').modal('hide');

    };

    vm.closeModalProfessor = function(){

        vm.alertaLoginProfessor = false;
        $('#professorModal').modal('hide');

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