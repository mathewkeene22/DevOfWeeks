import consumer from "./consumer";
require("jquery");

$(function () {
  $('[data-channel-subscribe="election"]').each(function (index, element) {
    let electionId = $(element).data("election-id");
    let templateInner = $(".inner");

    consumer.subscriptions.create(
      {
        channel: "ElectionChannel",
        election_id: electionId,
      },
      {
        received: function (data) {
          let content = templateInner.children().clone(true, true);
          content.find('.username').val(data.user_id);
          $(element).append(content);
          console.log(data);
        },
      }
    );
  });
});