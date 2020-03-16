$(document).ready(function () {
    $(".article").slice(0, 8).show();
    $("#loadMore").on("click", function (e) {
        e.preventDefault();
        $(".article:hidden").slice(0, 8).slideDown();
        if ($(".article:hidden").length == 0) {
            $("#loadMore").text("No more content").addClass("noContent");
        }
    });
})