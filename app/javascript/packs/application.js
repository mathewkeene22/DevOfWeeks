import "materialize-css/dist/js/materialize";
require('@rails/ujs').start()
require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')
require('jquery')
require("chartkick");
require("chart.js");

// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);

$(document).on("turbolinks:load", function () {
  $(".dropdown-trigger").dropdown({ hover: false });
});