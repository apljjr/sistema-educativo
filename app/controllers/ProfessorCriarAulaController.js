module.exports = function($scope,$rootScope,$location,$http,$filter,clientAPIService,clientTestService,configValue,
                        bonusGenerator,routeInfo, $sce, youtubeFactory, $firebase, $localStorage, $route){
    
    var vm = $scope;
    var parent = $rootScope;
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

    vm.step1 = true;
    vm.step2 = false;
    vm.step3 = false;
    vm.step4 = false;

    // options: complete - active - disabled
    vm.stepDadosGerais = "complete";
    vm.stepVideos = "disabled";
    vm.stepPerguntas = "disabled";
    vm.stepFinalizar = "disabled";

    if (!firebase.apps.length) {
        parent.config = {
            apiKey: 'AIzaSyCBncy_zTg4cSEaOoy0FfRVZYjVV5c1LOQ',
            authDomain: 'eduq-b0d87.firebaseapp.com',
            databaseURL: 'https://eduq-b0d87.firebaseio.com',
        };

        firebase.initializeApp(parent.config);
    }
    
    vm.add = function(){
        $.each(vm.objectAula.videos, function(index, result) {
            delete result["$$hashKey"];
        });
        $.each(vm.objectAula.perguntas, function(index, result) {
            delete result["$$hashKey"];
        });
        firebase.database().ref('aulas/' + vm.objectAula.token).set(vm.objectAula);
    };
    
   vm.edit=function(value){
        $scope.app=value;
    };

    vm.delete=function(item){
        $scope.DB.$remove(item);
    };

    vm.objectAula = {
        token:'',
        user: storege.user,
        disciplina:'',
        conteudoGeral: '',
        conteudoEspecifico:'',
        objetivoAula:'',
        videos: '',
        perguntas: ''
    };

    vm.listaVideosView = [];
    vm.listaAdicionados = [];
    vm.arrayPerguntas = [];

    vm.estruturaQuestao = {
        question: '',
        options:[ '', '', '', ''],
        correct: 1
    };

    vm.estruturaVideo = {
        id : null,
        video: null,
        imagem : null,
        titulo : null
    };

    function cleanQuestao(){
        var cleanEstrutura = {
            "question":"",
            "options":[ "", "", "", ""],
            "correct": 1
        };

        vm.estruturaQuestao = cleanEstrutura;
    }

    vm.numQuestao = 1;

    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

    vm.ativaBtnPrimeiroStep = true;

    vm.verificaDadosPessoais = function(){
        if(vm.disciplina.trim() !== "" &&  vm.conteudoGeral.trim() !== "" && vm.objetivoAula.trim() !== ""){
            vm.ativaBtnPrimeiroStep = false;
        }else{
            vm.ativaBtnPrimeiroStep = true;
        }   
    };

    vm.avancarStep1 = function(){

        vm.stepDadosGerais = "complete";
        vm.stepVideos = "complete";
        vm.stepPerguntas = "disabled";
        vm.stepFinalizar = "disabled";

        vm.objectAula.disciplina = vm.disciplina;
        vm.objectAula.conteudoGeral = vm.conteudoGeral;
        vm.objectAula.conteudoEspecifico = "";
        vm.objectAula.objetivoAula = vm.objetivoAula;

        console.log(vm.objectAula);

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

        vm.objectAula.videos = vm.listaAdicionados;

        console.log(vm.objectAula);

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

        if( vm.arrayPerguntas.length < 1){
            vm.arrayPerguntas.push(vm.estruturaQuestao);
        } else if(vm.arrayPerguntas.length >= 1){
            vm.arrayPerguntas.push(vm.estruturaQuestao);
        }

        console.log(vm.arrayPerguntas);
        
        vm.objectAula.token = '';
        vm.objectAula.perguntas = vm.arrayPerguntas;

        console.log(vm.objectAula);

        vm.objectAula.token = ((String)(Math.random().toFixed(10))).substring(2, 12);
        vm.add();

        vm.step1 = false;
        vm.step2 = false;
        vm.step3 = false;
        vm.step4 = true;
    };

    vm.adicionarVideo = function(video){
        var contem = false;
        $.each(vm.listaAdicionados, function(index, result) {
            if(result.id == video.id) {
                contem = true;
            }    
        });

        if(!contem){
            vm.listaAdicionados.push(video);
            vm.viewVideosAdd = false;
            vm.viewVideosAdd = true;
        }
        
        if(vm.listaAdicionados.length !== 0){
            vm.ativaBtnSegundoStep = false;
        }else{
            vm.ativaBtnSegundoStep = true;
        }
    };

    vm.removerVideo = function(video){
        $.each(vm.listaAdicionados, function(index, result) {
            if(result.id == video.id) {
                vm.listaAdicionados.splice(index, 1);
            }    
        });

        if(vm.listaAdicionados.length !== 0){
            vm.ativaBtnSegundoStep = false;
        }else{
            vm.ativaBtnSegundoStep = true;
        }
    };

    vm.ativaBtnTerceiroStep = true;

    vm.verificaQuiz = function(){
        if( vm.estruturaQuestao.question !== "" 
            && vm.estruturaQuestao.options[0] !== "" 
            && vm.estruturaQuestao.options[1] !== "" 
            && vm.estruturaQuestao.options[2] !== "" 
            && vm.estruturaQuestao.options[3] !== ""){
            vm.ativaBtnTerceiroStep = false;
        }else{
            vm.ativaBtnTerceiroStep = true;
        }
    };

    vm.novaQuestao = function(){
        vm.numQuestao++;
        vm.arrayPerguntas.push(vm.estruturaQuestao);
        cleanQuestao();
        vm.verificaQuiz();
    };

    vm.redirectCriarAula = function(){
        $location.path('/criarAulaProfessor');  
    };

    vm.redirectVisualizarAulas = function(){
        $location.path('/visualizarAulasProfessor');
    };

    vm.redirectCriarAula = function(){
        $route.reload(); 
    };

    vm.removeFrame = function(idFrame){
        // $(idFrame).remove();

        $(idFrame).each(function(){
        var el_src = $(this).attr("src");
        $(this).attr("src",el_src);
      });
    };

    var _apiKey = "AIzaSyCfkG-aD3kVrHHfgkklihC8MhbaMaUOiKY";

    vm.buscarVideos = function(value){
        vm.listaVideosView = [];
        youtubeFactory.getVideosFromSearchByParams({
            q: value.replace(/%20/g, "+"),
            maxResults: "10",
            key: _apiKey,
            order: "viewCount",
        }).then(function (_data) {

            _data.data.items.forEach(
                function(element) {
                var imagem = element.snippet.thumbnails.medium.url;
                var linkVideo = "https://www.youtube.com/embed/" + element.id.videoId;
                var title = element.snippet.title;
                var id = element.id.videoId
                var estrObject = {
                    "imagem": imagem,
                    "video": linkVideo,
                    "titulo": title,
                    "id": id
                };
                
                vm.listaVideosView.push(estrObject);
            });

            console.info("videos from search by q", _data);
        });

        vm.viewVideos = true;
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