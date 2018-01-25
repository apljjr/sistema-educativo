module.exports = function($scope,$rootScope,$location,$http,$filter,clientAPIService,clientTestService,configValue,bonusGenerator,routeInfo,$sce, $firebase, $timeout,$firebaseArray, $localStorage){
    
    var vm = $scope;
    var root = $rootScope;
    var storege = $localStorage;

    vm.user = storege.user;

    vm.name = $filter("uppercase")(configValue.appName);
    vm.msg = "";
    vm.clients = [];
    vm.page = routeInfo.routeName;
    vm.navClass = routeInfo.navClass;

    var active = 'active'
    vm.classActiveCriarAula; //active
    vm.classActiveVisualizarAula; //active

    vm.activeNavProfessor = true;

    vm.redirectCriarAula = function(){
        $location.path('/criarAulaProfessor');  
    };

    vm.redirectVisualizarAulas = function(){
        $location.path('/visualizarAulasProfessor');
    };

    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

    vm.arrayAulas = [];

    if (!firebase.apps.length) {
        parent.config = {
            apiKey: 'AIzaSyCBncy_zTg4cSEaOoy0FfRVZYjVV5c1LOQ',
            authDomain: 'eduq-b0d87.firebaseapp.com',
            databaseURL: 'https://eduq-b0d87.firebaseio.com',
        };

        firebase.initializeApp(parent.config);
    }

    var ref = firebase.database().ref("aulas");

    vm.loading= true;
    $firebaseArray(ref.orderByChild("user").equalTo(storege.user)).$loaded().then(function(data){
        vm.arrayAulas = data;
        console.log(data);
        vm.loading= false;
    }).catch(function(error){
        vm.error = "Problemas nas consultas das aulas";
    });

    vm.removeAula = function(id){
        ref.child(id).remove().then(function(result){
            console.log("Excluido com sucesso!");
        }).catch(function(error){
            console.log("Problemas na deleção!");
        });
    };

    

    vm.logout = function(){
        firebase.auth().signOut().then(function() {
            console.log("success logout");
        }, function(error) {
            console.log("error logout");
        });
        $location.path('/home');
    };

};