require('angular');
require('angular-route');
require('./locale/angular-locale_pt-br');

var routeConfig = require('./config/routeConfig');
var configConstant = require('./config/configConstant');
var configValue = require('./config/configValue');
var configBonusProvider = require('./config/configBonusProvider');
var bonusGenerator = require('./services/bonusGenerator');
var clientAPIService = require('./services/clientAPIService');
var clientTestService = require('./services/clientTestService');
var MainController = require('./controllers/MainController');
var ProfessorController = require('./controllers/ProfessorController');
var AlunoController = require('./controllers/AlunoController');
var AlunoQuizController = require('./controllers/AlunoQuizController');
var ProfessorCriarAulaController = require('./controllers/ProfessorCriarAulaController');
var ProfessorVisualizarAulasController = require('./controllers/ProfessorVisualizarAulasController');
var maskTel = require('./directives/maskTel');
var alertMsg = require('./directives/alertMsg');

angular.module('app',['ngRoute']);
angular.module('app').constant('configConstant',configValue);
angular.module('app').value('configValue',configValue);
angular.module('app').provider('bonusGenerator',[bonusGenerator]);

angular.module('app').config(['bonusGeneratorProvider','configConstant',configBonusProvider]);
angular.module('app').config(['$routeProvider',routeConfig]);

angular.module('app').factory('clientAPIService',['$http','configValue',clientAPIService]);
angular.module('app').service('clientTestService',['$http','configValue',clientTestService]);
angular.module('app').directive('maskTel',[maskTel]);
angular.module('app').directive('alertMsg',[alertMsg]);
angular.module('app').controller('MainController',['$scope','$rootScope','$filter','configValue','routeInfo','$location','$timeout',MainController]);
angular.module('app').controller('ProfessorController',['$scope','$rootScope','$location','$http','$filter','clientAPIService','clientTestService','configValue','bonusGenerator','routeInfo',ProfessorController]);
angular.module('app').controller('AlunoController',['$scope','$rootScope','$filter','clientAPIService','configValue','routeInfo','$routeParams','$location',AlunoController]);
angular.module('app').controller('AlunoQuizController',['$scope','$rootScope','$filter','clientAPIService','configValue','routeInfo','$routeParams','$http', '$sce',AlunoQuizController]);
angular.module('app').controller('ProfessorCriarAulaController',['$scope','$rootScope','$location','$http','$filter','clientAPIService','clientTestService','configValue','bonusGenerator','routeInfo','$sce',ProfessorCriarAulaController]);
angular.module('app').controller('ProfessorVisualizarAulasController',['$scope','$rootScope','$location','$http','$filter','clientAPIService','clientTestService','configValue','bonusGenerator','routeInfo','$sce',ProfessorVisualizarAulasController]);

