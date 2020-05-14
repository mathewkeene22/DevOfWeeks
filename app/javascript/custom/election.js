$(function () {
  $("#vote_form").on("ajax:success", function () {
    $("#vote_message").val("");
    let electionId = $(".election").data("election-id");
    let url = `/elections/${electionId}?refresh_chart=true`;
    $.ajax({
      url: url,
      type: "get",
      data: "",
      success: function (data) {
        console.log("something went right!");
      },
      error: function (data) {
        console.log("something went wrong");
      },
    });
  });
});
