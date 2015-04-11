angular.module('RecruiterNotes').factory('Recruiters', ['$firebaseArray', 'Auth', function ($firebaseArray, Auth) {
    
    return {
    	collection : function () {
            var auth = Auth.$getAuth(),
                uid = auth ? auth.uid : 'Anonymous',
                ref = new Firebase("https://recruiter-database.firebaseio.com/users/" + uid + "/recruiters");
    		return $firebaseArray(ref);
    	},
    	newRecruiter : function () {
    		return {
    			name: null,
	            photo: null,
	            email: null,
	            telephone: null,
	            companyLogo: null,
	            companyName: null,
	            notes: {
	                description: null
	            },
                otherNumbers: []
	        };
    	}
    };
}]);