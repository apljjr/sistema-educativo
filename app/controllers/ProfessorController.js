module.exports = function($scope,$rootScope,$location,$http,$filter,clientAPIService,clientTestService,configValue,bonusGenerator,routeInfo, $localStorage){
    
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


    vm.removeFrame = function(idFrame){
        // $(idFrame).remove();

        $(idFrame).each(function(){
        var el_src = $(this).attr("src");
        $(this).attr("src",el_src);
      });
    };

    vm.redirectCriarAula = function(){
        $location.path('/criarAulaProfessor');  
    };

    vm.redirectVisualizarAulas = function(){
        $location.path('/visualizarAulasProfessor');
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