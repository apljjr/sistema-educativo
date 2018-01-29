module.exports = function($scope,$rootScope,$filter,clientAPIService,configValue,routeInfo,$routeParams, $http, $sce, $location, $localStorage){
    
    var vm = $scope;
    var storege = $localStorage;
    $rootScope.navActive = true;
    vm.user = storege.aluno;
    
    vm.name = $filter("uppercase")(configValue.appName);
    vm.msg = "";
    vm.clients = [];
    vm.page = routeInfo.routeName;
    vm.navClass = routeInfo.navClass;

    vm.aula = storege.aula;
    vm.token = storege.token;
    vm.aluno = storege.aluno;

    $rootScope.navActive = true;

    vm.activeNavAluno = true;

    vm.btProximoQuiz = false;
    vm.progressoQuiz = 0;
    vm.resposta = null;
    vm.respostas = [];
    vm.respostasCorretas = [];
    vm.tamanhoQuiz = null;

    vm.btProximo = true;
    vm.btFinalizar = false;
    vm.viewResultado = false;
    vm.nQuestao = 1;

    var indiceQuiz = 0;

    var perguntas = vm.aula.perguntas;
    questionRamdom();

    function questionRamdom(){
      $.each(perguntas, function(index, result) {
          var random = Math.floor(Math.random() * 4);
          var valorOptions = result.options[random];
          perguntas[index].options[random] = result.options[0];
          perguntas[index].options[0] = valorOptions;
          vm.respostasCorretas.push(random + 1);
        });
    }

    function montarPerguntas(){
      var tamnhoArrayPerguntas = vm.aula.length;
    }

    function inicio(){
      //verifica tamanho quiz
      vm.tamanhoQuiz = perguntas.length;
      vm.progressoQuiz = 0;
    }

    function carregaPerguntas(){

      vm.estruturaQuiz = {
        "question": perguntas[indiceQuiz].question,
        "option1": perguntas[indiceQuiz].options[0],
        "option2": perguntas[indiceQuiz].options[1],
        "option3": perguntas[indiceQuiz].options[2],
        "option4": perguntas[indiceQuiz].options[3]
      };
      
      indiceQuiz++;
    }

    inicio();
    carregaPerguntas();

    vm.proximaPergunta = function(){

      if(vm.tamanhoQuiz > indiceQuiz){
        vm.respostas.push(vm.resposta);
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
        if(!vm.fimQuiz){
          vm.respostas.push(vm.resposta);
          gerarEstatistica();
        } 
        vm.viewResultado = true;
      }

    };

    var acertos = 0;
    var erros = 0;
    

    function gerarEstatistica(){
      vm.resultadoRespostas = [];
      $.each(vm.respostas, function(index, result) {
          if(vm.respostas[index] === vm.respostasCorretas[index]){
            vm.resultadoRespostas.push(true);
            acertos++;
          }else{
            vm.resultadoRespostas.push(false);
            erros++;
          }
      });
      console.log(vm.resultadoRespostas);
      gerarGrafico(acertos, erros)
    }

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

    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };


    vm.logout = function(){
        $location.path('/home');
    };

    vm.removeFrameVisualizador = function(idFrame){
      // $(idFrame).remove();
      var id_frame = '#' + idFrame;
      $(id_frame).each(function(){
      var el_src = $(this).attr("src");
      $(this).attr("src",el_src);
    });
  };


    function gerarGrafico(acertos, erros){
      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Acertos', acertos],
          ['Erros', erros]
        ]);

        // Set chart options
        var options = {'width':800,
                       'height':600,
                       'backgroundColor': 'none',
                       'fontSize': 15,
                       'is3D':true};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    }
    

};