/**
 * Master Controller
 */

angular.module('RecruiterNotes')
    .controller('MasterCtrl', ['$scope', '$cookieStore', '$stateParams', '$timeout', '$state', 'Auth', 'Recruiters', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $stateParams, $timeout, $state, Auth, Recruiters) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992,
        avatarPlaceholder = 'img/avatar.jpg';

    $scope.auth = Auth;
    $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        if (authData && authData.google && authData.google.cachedUserProfile) {
            $scope.avatar = authData.google.cachedUserProfile.picture;
        }
        Recruiters.collection().$loaded().then(function (response) {
            $scope.recruiters = response;
        });
    });
    $scope.logout = function () {
        $scope.auth.$unauth();
        $scope.authData = null;
        $scope.avatar = avatarPlaceholder;
        window.location.reload();
    };
    $scope.login = function () {
        $scope.auth.$authWithOAuthPopup('google');
    };

    $scope.recruiters = [];
    Recruiters.collection().$loaded().then(function (response) {
        $scope.recruiters = response;
    });

    $scope.avatar = avatarPlaceholder;

    $scope.deleteRecruiter = function ($event, recruiter) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.recruiters.$remove(recruiter);
    };

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };

    $scope.alerts = [];

    $scope.addAlert = function(alertObj) {
        $scope.alerts.push(alertObj);
        $timeout(function () {
            $scope.closeAlert(0);
        }, 3000);
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.search = {
        text : ''
    };
}