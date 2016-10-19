$(document).ready(function() {
    //Text added on click, and appears in HTML, below script
    $( "body" ).append( "<button class='ui-button ui-widget ui-corner-all'>Get Data</button>" );

    $("button").click(function() {
        //$("p").remove();
        $( "p" ).remove();
        $.ajax({
            url: "/fetch",
            type: "GET",
            data: {
              name: "Lab 7 Data returned"
            }
        })
        .done(function( result ) {
           $("body").append("<p> Data: " + result.content + "</p>");
        })

        .fail(function(xhr, status, errorThrown) {
            console.log('AJAX request failed...');
            $("body").append("<p> no data yet... </p>");
         })
    });
});
