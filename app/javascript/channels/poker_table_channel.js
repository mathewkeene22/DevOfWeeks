import consumer from "./consumer";
import ConfettiGenerator from "confetti-js";
require("jquery");

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

const isUnanimous = () => {
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
}

const allDifferent = () => {
  const mergeSettings = {
    "clock": "10",
    "size": "15",
    "respawn": false,
    "props": [
      { "type": "svg", "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/029-sad-but-relieved-face.svg/512px-029-sad-but-relieved-face.svg.png" }
    ],
  }
  const confetti = new ConfettiGenerator({...confettiSettings, ...mergeSettings});
  confetti.render();
}

const allButOne = () => {
  // TODO: need some svg for this scenario
  const mergeSettings = {
    "clock": "10",
    "size": "15",
    "respawn": false,
    "props": [
      { "type": "svg", "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/D%27oh%21.svg/1024px-D%27oh%21.svg.png" }
    ],
  }
  const confetti = new ConfettiGenerator({...confettiSettings, ...mergeSettings});
  confetti.render();
}

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
            $(".results-container").html(data.html);
            console.log(data)
            if(this.url.includes('show_cards=true') && data.special_animation) {
              eval(data.special_animation)()
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
