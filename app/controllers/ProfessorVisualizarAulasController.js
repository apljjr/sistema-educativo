module.exports = function($scope,$rootScope,$location,$http,$filter,clientAPIService,clientTestService,configValue,bonusGenerator,routeInfo,$sce){
    
    var vm = $scope;
    var root = $rootScope;

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

    vm.objectAula1 = {
        'token': '07082017123',
        'disciplina':'Português',
        'conteudoGeral': 'Ortográfia das palavras',
        'conteudoEspecifico': 'Acentuação',
        'objetivoAula':'A aula tem por objetivo melhorar os conhecimento da nova ortografia da língua portuguesa',
        'videos': [
            "https://www.youtube.com/embed/49P7uTXpPOI",
            "https://www.youtube.com/embed/Sy_LUnePfRE",
            "https://www.youtube.com/embed/zpQEwWiZF7Y",
            "https://www.youtube.com/embed/Ks90DtZUso4"    
        ],
        'perguntas':{
        "questions":[
            {
            "question":"As novas regras de acentuação trouxeram algumas mudanças no acento de algumas palavras. Assinale a alternativa que faz parte da mudança do novo acordo:",
            "options":[ "Ditongos OI e EI serão acentuados somente nas palavras paroxítonas.",
                        "Não acentuamos mais as oxítonas terminadas em vogais.",
                        "Ditongos abertos nas palavras proparoxítonas não são mais acentuados.",
                        "As letras I e U que vierem após um ditongo nas palavras paroxítonas não são mais acentuadas."  ],
            "correct": 4
            },
            {
            "question":"Assinale a alternativa que tenha palavras com a mesma regra de acentuação:",
            "options":[ "Pá, compôs, herói, vácuo, sótão, estética.",
                        "Louvável, álbum, revólver, táxi, éden.",
                        "Repórter, louvável, álbum, fotógrafo, farmácia.",
                        "Sabiá, jiló, café, sótão, órfão, órgão."  ],
            "correct": 2
            }            
        ]
        }
    };

    vm.objectAula2 = {
        'token': '07082017321',
        'disciplina':'Português',
        'conteudoGeral': 'Gramática',
        'conteudoEspecifico': 'Verbo',
        'objetivoAula':'A aula tem por objetivo melhorar os conhecimento da nova ortografia da língua portuguesa',
        'videos': [
            "https://www.youtube.com/embed/49P7uTXpPOI",
            "https://www.youtube.com/embed/Sy_LUnePfRE",
            "https://www.youtube.com/embed/zpQEwWiZF7Y",
            "https://www.youtube.com/embed/Ks90DtZUso4"    
        ],
        'perguntas':{
        "questions":[
            {
            "question":"As novas regras de acentuação trouxeram algumas mudanças no acento de algumas palavras. Assinale a alternativa que faz parte da mudança do novo acordo:",
            "options":[ "Ditongos OI e EI serão acentuados somente nas palavras paroxítonas.",
                        "Não acentuamos mais as oxítonas terminadas em vogais.",
                        "Ditongos abertos nas palavras proparoxítonas não são mais acentuados.",
                        "As letras I e U que vierem após um ditongo nas palavras paroxítonas não são mais acentuadas."  ],
            "correct": 4
            },
            {
            "question":"Assinale a alternativa que tenha palavras com a mesma regra de acentuação:",
            "options":[ "Pá, compôs, herói, vácuo, sótão, estética.",
                        "Louvável, álbum, revólver, táxi, éden.",
                        "Repórter, louvável, álbum, fotógrafo, farmácia.",
                        "Sabiá, jiló, café, sótão, órfão, órgão."  ],
            "correct": 2
            }            
        ]
        }
    };

    vm.arrayAulas.push(vm.objectAula1);
    vm.arrayAulas.push(vm.objectAula2);




};