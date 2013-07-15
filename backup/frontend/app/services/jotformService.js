jotModule.factory('jotservice',function($q,$timeout,$http){
	var jotservice = {};

	jotservice.getForms = function(){

		var deferred = $q.defer();
		JF.getForms(function(response){
			$timeout(function(){// put deferred into a $timeout to make it in $digest cycle
				deferred.resolve(response);
			},1);
		});
		return deferred.promise;
	};

	jotservice.sendFormListToServer = function(forms){
		return $http.post("/goback/addBackupTasks",forms).then(function(response){
			console.log("/addBackupTasks  => ",response);
			return response;
		});
	}


	return jotservice;
});

jotModule.factory('valStorage',function(){
	var serv = {}
	var vals = []
	vals["jot_logged_in"] = false;

	serv.get = function(parName){
		if(vals[parName] !== undefined){
			return vals[parName];
		}
	}

	serv.set = function(parName,value){
		vals[parName] = value;
		return value;
	}
	return serv;
});