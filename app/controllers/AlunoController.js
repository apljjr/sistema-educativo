module.exports = function($scope,$rootScope,$filter,clientAPIService,configValue,routeInfo,$routeParams, $location, $localStorage, $sce){
    
    var vm = $scope;
    var parent = $rootScope;
    var storege = $localStorage;

    vm.aula = storege.aula;
    vm.token = storege.token;
    vm.aluno = storege.aluno;
    vm.user = storege.aluno;
    console.log(vm.aula);

    $rootScope.navActive = true;
    
    vm.name = $filter("uppercase")(configValue.appName);
    vm.msg = "";
    vm.clients = [];
    vm.page = routeInfo.routeName;
    vm.navClass = routeInfo.navClass;

    $rootScope.navActive = true;

    vm.activeNavAluno = true;

    vm.iniciarQuiz = function(){
        $location.path('/quizAluno');
    };

    vm.logout = function(){
        $location.path('/home');
    };

    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

    vm.logout = function(){
        $location.path('/home');
    };

    vm.setarIcon = function(idVideo){
        vm.aula.videos.forEach(function(element, index) {
            if(element.id === idVideo){
                vm.aula.videos[index].icon = true;
            }
        }, this);
        vm.verificaIconVideos();
    };

    vm.ativaBtnQuiz = true;

    vm.verificaIconVideos = function(){

        var verificacao = false;

        vm.aula.videos.forEach(function(element) {
            if(element.icon === false || element.icon === undefined){
                verificacao = true;
            }
        }, this);

        if(!verificacao){
            vm.ativaBtnQuiz = false;
        }
    };

    vm.removeFrameVisualizador = function(idFrame){
        // $(idFrame).remove();
        var id_frame = '#' + idFrame;
        $(id_frame).each(function(){
        var el_src = $(this).attr("src");
        $(this).attr("src",el_src);
      });
    };
};