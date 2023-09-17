$(document).ready(function () {
    $(".window .back").click(function (e) { 
        e.preventDefault();
        $($(this).parent()).hide(200);
    });
});