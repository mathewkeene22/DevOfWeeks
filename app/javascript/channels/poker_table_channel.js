import consumer from "./consumer";
require("jquery");

$(document).on("turbolinks:load", function () {
  consumer.subscriptions.create(
    {
      channel: "PokerTableChannel",
    },
    {
      received: function (data) {
        let showCards = data && data.flip_cards == true ? true : false
        console.log("connected");
        let url = `/poker_tables?refresh_chart=true&show_cards=${showCards}`;
        $.ajax({
          url: url,
          type: "get",
          data: "",
          success: function (data) {
            $(".results-container").html(data);
          },
          error: function (data) {
            console.log("something went wrong");
          },
        });
      },
    }
  );
});