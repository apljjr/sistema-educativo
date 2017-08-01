module.exports = function($routeProvider){
    
    
    $routeProvider.when("/home",{
        templateUrl:"view/home.html",
        controller:"MainController",
        resolve:{
            routeInfo:function(){
                return {routeName:"Home",navClass:"navbar-default", backgroundIMG:"body-imagem-home"};
            }
        }
    });
    $routeProvider.when("/aluno",{
        templateUrl:"view/aluno/aluno.html",
        controller:"AlunoController",
        resolve:{
            routeInfo:function(){
                return {routeName:"Aluno",navClass:"navbar-inverse-aluno"};
            }
        }
    });

    $routeProvider.when("/professor",{
        templateUrl:"view/professor.html",
        controller:"ProfessorController",
        resolve:{
            routeInfo:function(){
                return {routeName:"Professor",navClass:"navbar-inverse-professor"};
            }
        }
    });

    $routeProvider.when("/quizAluno",{
        templateUrl:"view/aluno/quiz.html",
        controller:"AlunoQuizController",
        resolve:{
            routeInfo:function(){
                return {routeName:"Aluno",navClass:"navbar-inverse-aluno"};
            }
        }
    });

    $routeProvider.otherwise({redirectTo:"/home"});
};