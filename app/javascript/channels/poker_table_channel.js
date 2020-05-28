import consumer from "./consumer";
require("jquery");

$(document).on("turbolinks:load", function () {
    consumer.subscriptions.create(
        {
        channel: "PokerTableChannel",
        },
        {
        received: function (data) {
            debugger
            console.log("connected");
            let url = `/poker_tables?refresh_chart=true`;
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