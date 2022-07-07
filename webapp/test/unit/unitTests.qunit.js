/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"brcomsupri/fiori_app_suprimentos_199/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
