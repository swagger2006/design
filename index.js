
$("button").hover(
    function () { // Mouse enters
        $(this).css("box-shadow", "5px 5px 15px rgba(0, 0, 0, 10)");
    },
    function () { // Mouse leaves
        $(this).css("box-shadow", "none");
    }
);

$(".but1").on("click",function () {
    window.location.href="com.html"
});

$(".but2").on("click",function () {
    window.location.href="coach.html"
});

$(".but3").on("click",function () {
    window.location.href="event.html"
});

$(".but4").on("click",function () {
    window.location.href="about.html"
});