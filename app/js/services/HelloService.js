'use strict';

function HelloService($http){
	return {
		sayHello:function(){
			return "hello";
		}	
	}
}

app.factory('$hello', ['$http', HelloService]);
