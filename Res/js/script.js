var windowWidth = $(window).width(); //retrieve current window width
var windowHeight = $(window).height(); //retrieve current window height
var documentWidth = $(document).width(); //retrieve current document width
var documentHeight = $(document).height(); //retrieve current document height
var vScrollPosition = $(document).scrollTop(); //retrieve the document scroll ToP position
var hScrollPosition = $(document).scrollLeft(); //retrieve the document scroll Left position


$(document).ready(function () {

    var $container = $(".full-screen");

    $container.height(windowHeight);

    var $ficon = $("#fromaddr").prev();
    $("#fromaddr").height($ficon.height());
    $("#toaddr").height($ficon.height());

    $(window).resize(function () {
        windowWidth = $(window).width(); //retrieve current window width
        windowHeight = $(window).height(); //retrieve current window height
        documentWidth = $(document).width(); //retrieve current document width
        documentHeight = $(document).height(); //retrieve current document height
        vScrollPosition = $(document).scrollTop(); //retrieve the document scroll ToP position
        hScrollPosition = $(document).scrollLeft(); //retrieve the document scroll Left position
        $container.height(windowHeight);
    });

    $('#date').datepicker({
        format: "dd/mm/yyyy"
    });

    $('#myloc').on("click", function () {
        UpdateMyPosition();
    });

    $("#submit").on("click", function () {
        calcRoute($("#fromaddr").val(), $("#toaddr").val(), $("#date").val());
    });

});