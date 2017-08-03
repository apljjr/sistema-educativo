module.exports = function($scope,$rootScope,$filter,clientAPIService,configValue,routeInfo,$routeParams, $http, $sce){
    
    var vm = $scope;
    $rootScope.navActive = true;
    
    vm.name = $filter("uppercase")(configValue.appName);
    vm.msg = "";
    vm.clients = [];
    vm.page = routeInfo.routeName;
    vm.navClass = routeInfo.navClass;

    $rootScope.navActive = true;

    vm.activeNavAluno = true;

    vm.btProximoQuiz = false;
    vm.progressoQuiz = 0;
    vm.resposta = null;
    vm.respostas = [];
    vm.tamanhoQuiz = null;

    vm.btProximo = true;
    vm.btFinalizar = false;
    vm.viewResultado = false;
    vm.nQuestao = 1;

    var indiceQuiz = 0;

    var perguntas = {
      "questions":[
        {
          "question":"As dez classes gramaticais são fundamentais para a compreensão da norma culta da língua portuguesa. Dessa forma, qual é a ordem correta das classes em uma oração?",
          "options":[ "Artigo, substantivo, adjetivo, preposição, numeral, pronome, verbo, conjunção, advérbio e interjeição.",
                      "Artigo, substantivo, adjetivo, numeral, pronome, verbo, advérbio, preposição, conjunção e interjeição.",
                      "Preposição, substantivo, adjetivo, pronome, verbo, numeral, artigo, conjunção, interjeição e advérbio.",
                      "Interjeição, adjetivo, substantivo, pronome, verbo, artigo, numeral, advérbio, preposição e conjunção."  ],
          "correct": 1
        },
        {
          "question":"No refrão da música 'Cálice', do cantor e compositor Chico Buarque, 'Pai, afasta de MIM ESSE cálice...', os termos destacados exercem, morfologicamente, a função de pronomes. Quais, respectivamente?",
          "options":[ "Pronome pessoal do caso oblíquo e pronome demonstrativo.",
                      "Pronome indefinido e pronome demonstrativo.",
                      "Pronome pessoal do caso reto e pronome possessivo.",
                      "Pronome pessoal do caso reto e pronome demonstrativo."  ],
          "correct": 2
        }            
      ]
    };

    function inicio(){
      //verifica tamanho quiz
      vm.tamanhoQuiz = perguntas.questions.length;
      vm.progressoQuiz = 0;
    }

    function carregaPerguntas(){

      vm.estruturaQuiz = {
        "question": perguntas.questions[indiceQuiz].question,
        "option1": perguntas.questions[indiceQuiz].options[0],
        "option2": perguntas.questions[indiceQuiz].options[1],
        "option3": perguntas.questions[indiceQuiz].options[2],
        "option4": perguntas.questions[indiceQuiz].options[3]
      };
      
      indiceQuiz++;
    }

    inicio();
    carregaPerguntas();

    vm.proximaPergunta = function(){

      vm.respostas.push(vm.resposta);
      if(vm.tamanhoQuiz > indiceQuiz){
        vm.progressoQuiz = (String)((indiceQuiz/vm.tamanhoQuiz)*100)+'%';
        carregaPerguntas();
        vm.btProximoQuiz = false;
        vm.nQuestao = indiceQuiz;
        clearOption();  
        if(vm.tamanhoQuiz == indiceQuiz){
          vm.btProximo = false;
          vm.btFinalizar = true;
        }
      }else{
        vm.viewResultado = true;
      }

       
    };

    vm.clickResposta = function(value){
      vm.resposta = value;

      if(value === 1){
        vm.resp1 = true;
        vm.resp2 = false;
        vm.resp3 = false;
        vm.resp4 = false;
        vm.btProximoQuiz = true;

      }else if(value === 2){
        vm.resp1 = false;
        vm.resp2 = true;
        vm.resp3 = false;
        vm.resp4 = false;
        vm.btProximoQuiz = true;

      }else if(value === 3){
        vm.resp1 = false;
        vm.resp2 = false;
        vm.resp3 = true;
        vm.resp4 = false;
        vm.btProximoQuiz = true;

      }else if(value === 4){
        vm.resp1 = false;
        vm.resp2 = false;
        vm.resp3 = false;
        vm.resp4 = true;
        vm.btProximoQuiz = true;
      }
    };

    function clearOption(){
        vm.resp1 = false;
        vm.resp2 = false;
        vm.resp3 = false;
        vm.resp4 = false;
    };

};