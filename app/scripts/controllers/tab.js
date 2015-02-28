'use strict';

var tabs = [{title:'Town', url:'town'}, 
			{title:'Roster', url:'roster'},
			{title:'Options', url:'options'},
			{title:'Achievements', url:'achievements'}];

angular.module('ponyApp').controller('TabController', [function() {
	var self = this;
	self.tabs = tabs;
}]);