
require.config({
	paths: {
		'jquery': 'plugins/jquery-1.9.1.min',
		'tabToggle': 'myPlugin/tabToggle'
	}
});

require(['jquery', 'tabToggle'], function() {

	$('.jq-tabMenu-index').tabToggle();

});