module.exports = function($scope,$rootScope,$location,$http,$filter,clientAPIService,clientTestService,configValue,bonusGenerator,routeInfo, $sce, youtubeFactory){
    
    var vm = $scope;
    var parent = $rootScope;

    vm.name = $filter("uppercase")(configValue.appName);
    vm.msg = "";
    vm.clients = [];
    vm.page = routeInfo.routeName;
    vm.navClass = routeInfo.navClass;

    var active = 'active'
    vm.classActiveCriarAula; //active
    vm.classActiveVisualizarAula; //active

    vm.activeNavProfessor = true;

    vm.step1 = true;
    vm.step2 = false;
    vm.step3 = false;
    vm.step4 = false;

    // options: complete - active - disabled
    vm.stepDadosGerais = "complete";
    vm.stepVideos = "disabled";
    vm.stepPerguntas = "disabled";
    vm.stepFinalizar = "disabled";

    vm.objectAula = {
        'disciplina':null,
        'conteudoGeral': null,
        'conteudoEspecifico': null,
        'objetivoAula':null,
        'videos': null,
        'perguntas': null
    }

    vm.listaVideos = [
        "https://www.youtube.com/embed/49P7uTXpPOI",
        "https://www.youtube.com/embed/Sy_LUnePfRE",
        "https://www.youtube.com/embed/zpQEwWiZF7Y",
        "https://www.youtube.com/embed/Ks90DtZUso4"    
    ];

    vm.listaVideosView = [];

    vm.listaAdicionados = [];

    parent.arrayPerguntas = {
        'questions':[]
    };

    vm.estruturaQuestao = {
        "question": null,
        "options":[ null, null, null, null],
        "correct": 1
    };

    function cleanQuestao(){
        var q = {
            "question":"",
            "options":[ "", "", "", ""],
            "correct": 1
        };

        vm.estruturaQuestao = q;
    }

    vm.numQuestao = 1;

    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

    vm.avancarStep1 = function(){

        vm.stepDadosGerais = "complete";
        vm.stepVideos = "complete";
        vm.stepPerguntas = "disabled";
        vm.stepFinalizar = "disabled";

        vm.step1 = false;
        vm.step2 = true;
        vm.step3 = false;
        vm.step4 = false;

    };

    vm.avancarStep2 = function(){
        vm.stepDadosGerais = "complete";
        vm.stepVideos = "complete";
        vm.stepPerguntas = "complete";
        vm.stepFinalizar = "disabled";

        vm.step1 = false;
        vm.step2 = false;
        vm.step3 = true;
        vm.step4 = false;
    };

    vm.avancarStep3 = function(){
        vm.stepDadosGerais = "complete";
        vm.stepVideos = "complete";
        vm.stepPerguntas = "complete";
        vm.stepFinalizar = "active";

        vm.step1 = false;
        vm.step2 = false;
        vm.step3 = false;
        vm.step4 = true;
    };

    // vm.buscarVideos = function(value){
    //     vm.viewVideos = true;
    //     vm.listaVideosView = vm.listaVideos;

    // };

    vm.adicionarVideo = function(value){

        vm.listaAdicionados.push(value);
        vm.viewVideosAdd = false;
        vm.viewVideosAdd = true;
    };

    vm.novaQuestao = function(){
        vm.numQuestao++;
        parent.arrayPerguntas.questions.push(vm.estruturaQuestao);
        cleanQuestao();
    };

    vm.redirectCriarAula = function(){
        $location.path('/criarAulaProfessor');  
    };

    vm.redirectVisualizarAulas = function(){
        $location.path('/visualizarAulasProfessor');
    };


    var _apiKey = "AIzaSyCfkG-aD3kVrHHfgkklihC8MhbaMaUOiKY";

    vm.buscarVideos = function(value){
        vm.listaVideosView = [];
        youtubeFactory.getVideosFromSearchByParams({
            q: value.replace(/%20/g, "+"),
            maxResults: "20",
            key: _apiKey,
            order: "viewCount",
        }).then(function (_data) {

            _data.data.items.forEach(
                function(element) {
                vm.listaVideosView.push("https://www.youtube.com/embed/" + element.id.videoId);
            });

            
            console.info("videos from search by q", _data);
        });

        vm.viewVideos = true;
        // vm.listaVideosView = vm.listaVideos;
    };
    


    
};