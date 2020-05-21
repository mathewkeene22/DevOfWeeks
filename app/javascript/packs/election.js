$(document).on("turbolinks:load", function () {
  $("#vote_form").on("ajax:success", function () {
    $("#vote_message").val("");
    var electionId = $(".election").data("election-id");
    var url = `/elections/${electionId}?refresh_chart=true`;
    $.ajax({
      url: url,
      type: "get",
      data: "",
      success: function (data) {
        $(".chart-container").html(data);
        $("#vote_form input.btn").attr("disabled", true);
      },
      error: function (data) {
        console.log("something went wrong");
      },
    });
  });
});
