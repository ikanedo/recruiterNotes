angular.module('RecruiterNotes').controller('RecruiterDetailCtrl', ['$scope', '$stateParams', 'Recruiters', RecruiterDetailCtrl]);

function RecruiterDetailCtrl($scope, $stateParams, Recruiters) {
	$scope.recruiter = {
		photo : 'http://www.mediasquarerecruitment.co.uk/media/1529/ghostperson2.png'
	};

	Recruiters.collection().$loaded().then(function (res) {
		$scope.recruiters = res;
		$scope.recruiter = $scope.recruiters.$getRecord($stateParams['id']);
	});

	$scope.isEditableNote = false;
	$scope.editNote = function (recruiter) {
		$scope.originalNote = angular.copy(recruiter.notes.description);
		$scope.isEditableNote = true;
	};
	$scope.saveNote = function (recruiter) {
		$scope.recruiters.notes.lastUpdated = new Date().getTime();
		$scope.recruiters.$save(recruiter);
		$scope.isEditableNote = false;
		$scope.addAlert({
            type: 'success',
            msg: 'Success! Recruiter notes updated!'
        });
	};
	$scope.cancelNote = function (recruiter) {
		$scope.recruiter.notes.description = $scope.originalNote;
		$scope.isEditableNote = false;
	};
	$scope.addNumber = function (recruiter, newNumber) {
		recruiter.otherNumbers = recruiter.otherNumbers || [];
		recruiter.otherNumbers.push(newNumber);
		$scope.recruiters.$save(recruiter);
		$scope.addAlert({
            type: 'success',
            msg: 'Success! Additional number updated!'
        });
        $scope.newNumber = null;
	};
	$scope.removeNumber = function (recruiter, index) {
		recruiter.otherNumbers.splice(index, 1);
	};
}