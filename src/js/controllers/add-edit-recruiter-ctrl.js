/**
 * Master Controller
 */

angular.module('RecruiterNotes')
    .controller('AddEditRecruiterCtrl', ['$scope', '$state', '$stateParams', 'Recruiters', AddEditRecruiterCtrl]);

function AddEditRecruiterCtrl($scope, $state, $stateParams, Recruiters) {
    var addEditRecord = function (record) {
        record.notes.lastUpdated = (new Date().getTime());
        return record.$id
            ? $scope.recruiters.$save(record)
            : $scope.recruiters.$add(record);
    };

    Recruiters.collection().$loaded().then(function (response) {
        $scope.recruiters = response;
        $scope.tempRecruiter = $scope.recruiters.$getRecord($stateParams['id']) || Recruiters.newRecruiter();
        $scope.tempRecruiter.photoPreview = 'img/avatar.jpg';
    });
    $scope.saveRecruiter = function (recruiter) {
        addEditRecord(recruiter).then(function (ref) {
            $state.go('recruiterDetail', { id: ref.key() })
        });

        $scope.addAlert({
            type: 'success',
            msg: 'Recruiter saved!'
        });
    };

}