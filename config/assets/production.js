'use strict';

module.exports = {
	client: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
				'public/lib/angular-ui-select/dist/select.min.css',
				'public/lib/angularjs-toaster/toaster.css',
				'public/lib/angular-loading-bar/build/loading-bar.min.css'
			],
			js: [
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.min.js',
				'public/lib/angular-animate/angular-animate.min.js',
				'public/lib/angular-sanitize/angular-sanitize.min.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
				'public/lib/angular-file-upload/angular-file-upload.min.js',
				'public/lib/angular-ui-select/dist/select.min.js',
				'public/lib/angularjs-toaster/toaster.js',
				'public/lib/angular-loading-bar/build/loading-bar.min.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	}
};
