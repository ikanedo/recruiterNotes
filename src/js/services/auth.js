angular.module('RecruiterNotes').factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://recruiter-database.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);
