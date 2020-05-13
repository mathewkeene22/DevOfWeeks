require('@rails/ujs').start()
require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')
require('jquery')
require("chartkick");
require("chart.js");

$(function () {
  $('.foobar').on('ajax:success', function() {
    $('#vote_message').val('');
  });
});
