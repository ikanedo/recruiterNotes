'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RecruiterNotes').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

        //$locationProvider.html5Mode(true);

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('addEditRecruiter', {
                url: '/add-edit-recruiter/:id',
                templateUrl: 'templates/add-edit-recruiter.html',
                controller: 'AddEditRecruiterCtrl',
                resolve: {
                    currentAuth : ["Auth", function(Auth) {
                        return Auth.$waitForAuth();
                    }],
                    loadRecruiters :["Recruiters", function (Recruiters) {
                        return Recruiters.collection().$loaded();
                    }] 
                }
            })
            .state('recruiterDetail', {
                url: '/recruiter/:id',
                templateUrl: 'templates/recruiter.html',
                controller: 'RecruiterDetailCtrl',
                resolve: {
                    currentAuth : ["Auth", function(Auth) {
                        return Auth.$waitForAuth();
                    }]
                }
            })
            .state('about', {
                url : '/about',
                templateUrl: 'templates/about.html'
            });
    }
]);