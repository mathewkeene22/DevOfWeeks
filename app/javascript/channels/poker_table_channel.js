import consumer from "./consumer";
import ConfettiGenerator from "confetti-js";
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
          async: false,
          success: function (data) {
            // debugger
            $(".results-container").html(data.html);
            if(data.is_unanimous && this.url.includes('show_cards=true')){
              const confettiSettings = {
                "target": "confetti",
                "max": "300",
                "size": "1.5",
                "animate": true,
                "clock": "25",
                "rotate": true,
                "width": "1271",
                "height": "634",
                "respawn": true,
                "props": [
                  "circle",
                  "square",
                  "triangle",
                  "line"
                ],
                "colors": [
                  [165,104,246],
                  [230,61,135],
                  [0,199,228],
                  [253,214,126]
                ]
              }
              const confetti = new ConfettiGenerator(confettiSettings);
              confetti.render();
            } else {
              const canvas = document.getElementById("confetti");
              const ctx = canvas.getContext("2d")
              ctx.canvas.height = 0;
              ctx.canvas.width = 0;
            }
          },
          error: function (data) {
            console.log("something went wrong");
          },
        });
      },
    }
  );
});