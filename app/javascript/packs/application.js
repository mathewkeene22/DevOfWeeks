require('@rails/ujs').start()
require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')
require('jquery')
require("chartkick");
require("chart.js");

$(function () {
  $("#vote_form").on("ajax:success", function () {
    $("#vote_message").val("");
  });
});
