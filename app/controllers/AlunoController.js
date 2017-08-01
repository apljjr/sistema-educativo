module.exports = function($scope,$rootScope,$filter,clientAPIService,configValue,routeInfo,$routeParams, $location){
    
    var vm = $scope;
    $rootScope.navActive = true;
    
    vm.name = $filter("uppercase")(configValue.appName);
    vm.msg = "";
    vm.clients = [];
    vm.page = routeInfo.routeName;
    vm.navClass = routeInfo.navClass;

    $rootScope.navActive = true;


    // var listClient = function(){
    //     clientAPIService.getClient($routeParams.id).success(function(data,status){
    //         //console.log(data);
    //         //console.log(status);
    //         $scope.client = data;
    //     });
    // };

    // listClient();

    vm.iniciarQuiz = function(){
        $location.path('/quizAluno');
    };

};