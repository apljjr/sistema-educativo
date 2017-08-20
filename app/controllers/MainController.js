module.exports = function($scope,$rootScope,$filter,configValue,routeInfo,$location,$timeout, $firebase, $localStorage, $firebaseObject){
    var vm = $scope;
    var parent = $rootScope;
    var storege = $localStorage;
    


    vm.name = $filter("uppercase")(configValue.appName);
    vm.msg = "";
    vm.clients = [];
    vm.page = routeInfo.routeName;
    vm.navClass = routeInfo.navClass;
    vm.backgroundIMG = routeInfo.backgroundIMG;
    vm.login = true;
    vm.cadastrar = false;

    $rootScope.navActive = false;

    vm.alertaLoginProfessor = undefined;
    vm.alertaTokenAluno = false;

    if (!firebase.apps.length) {
        parent.config = {
            apiKey: 'AIzaSyCBncy_zTg4cSEaOoy0FfRVZYjVV5c1LOQ',
            authDomain: 'eduq-b0d87.firebaseapp.com',
            databaseURL: 'https://eduq-b0d87.firebaseio.com',
        };

        firebase.initializeApp(parent.config);
    }

    var ref = firebase.database().ref("aulas");


    vm.viewProfessor = function(){

        var user = document.getElementById("userProfessor").value;
        var key = document.getElementById("passProfessor").value;

        firebase.auth().signInWithEmailAndPassword(user, key).then(function(result){
            storege.user = user;
            setAlertaFalse()
            $('#professorModal').modal('hide');
            $timeout( function(){
                $location.path('/professor');
            }, 200 );
            

        }).catch(function(error) {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
            setAlertaTrue();
            
        });
    };

    function setAlertaTrue(){
        vm.alertaLoginProfessor = true;
    }

    function setAlertaFalse(){
        vm.alertaLoginProfessor = false;
    }

    vm.viewAluno = function(){

        var name = document.getElementById("nameAluno").value;
        var token = document.getElementById("tokenAluno").value;

        $firebaseObject(ref.child(token)).$loaded().then(function(data){
            storege.aula = data;
            storege.aluno = name;
            storege.token = token;
            console.log(data);
            vm.alertaTokenAluno = false;
            $('#alunoModal').modal('hide');

             $timeout( function(){
                $location.path('/aluno');
            }, 500 );
        }).catch(function(error){
            vm.error = "Problemas nas consultas das aulas";
            vm.erroToken = true;
            vm.alertaTokenAluno = true;
        });

        if(vm.alertaTokenAluno){
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