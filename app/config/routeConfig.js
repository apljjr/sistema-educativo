module.exports = function($routeProvider){
    $routeProvider.when("/home",{
        templateUrl:"view/home.html",
        controller:"MainController",
        resolve:{
            routeInfo:function(){
                return {routeName:"Home",navClass:"navbar-default"};
            }
        }
    });
    $routeProvider.when("/aluno",{
        templateUrl:"view/aluno.html",
        controller:"AlunoController",
        resolve:{
            routeInfo:function(){
                return {routeName:"Aluno",navClass:"navbar-inverse"};
            }
        }
    });

    $routeProvider.when("/client/:id",{
        templateUrl:"view/professor.html",
        controller:"ClientController",
        resolve:{
            routeInfo:function(){
                return {routeName:"Professor",navClass:"navbar-inverse"};
            }
        }
    });
    $routeProvider.otherwise({redirectTo:"/home"});
};