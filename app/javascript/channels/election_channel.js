import consumer from "./consumer";
require("jquery");

$(document).on("turbolinks:load", function () {
  $('[data-channel-subscribe="election"]').each(function (index, element) {
    let electionId = $(element).data("election-id");

    consumer.subscriptions.create(
      {
        channel: "ElectionChannel",
        election_id: electionId,
      },
      {
        received: function (data) {
          console.log("connected");
          let url = `/elections/${electionId}?refresh_chart=true`;
          $.ajax({
            url: url,
            type: "get",
            data: "",
            success: function (data) {
              $(element).find(".chart-container").html(data);
            },
            error: function (data) {
              console.log("something went wrong");
            },
          });
        },
      }
    );
  });
});