// Make sure the document is fully loaded before running code
$(document).ready(function() {

// Create a hardcoded list of dessert options 
const desserts = ["cheesecake", "donuts", "cake", "cupcake", "chocolate", "ice cream", "croissant", "cannoli"];

// SIDEBAR FUNCTIONALITY~~~~~~~~~~~~~~~
// set up a function that creates the buttons
function makeButtons() {

    // empty buttons div (so that buttons arent infinitely appending)
    $("#buttons").empty();

    //  run through array of desserts and create buttons
    for (i=0; i < desserts.length; i++) {

        // set up a new html button element
        let button = $("<button type='button' class='btn btn-light mr-3 mb-3'>");

        // set the text of the button to be the name of the dessert
        button.text(desserts[i]);

        // set the value of the button to also be the name of the dessert
        button.val(desserts[i]);

        // append buttons to button div
        $("#buttons").append(button);
    }
}

// Call the makeButtons function to initially create the hardcoded buttons
makeButtons();

// to add user buttons to the list:
// set up an onclick function for the Add button
$("#search").click(function() {

    // clear default event so that it doesn't try to submit a form
    event.preventDefault();

    // capture the text the user types into the input field & trim off any unnecessary spaces
    let input = $("#searchTerm").val().trim();

    // make sure they've entered something by setting a min length
    if (input.length > 2) {

        //push input to array and run makeButtons
        desserts.push(input);
        makeButtons();
    }
})

    
   

// GIF FUNCTIONALITY~~~~~~~~~~~~~~
// listen for user clicks on any of the dessert buttons
$(".btn").click(function() {

    // grab the value attribute of the button they click, which will plug into the API request URL
    let keyword = $(this).val();

    // set up the URL that will ping the Giphy API, with a spot to pull in the user's keyword
    let url = "https://api.giphy.com/v1/gifs/search?api_key=9QKf3NFG5b4l6jRUWl3g3bcxd4f1z6wR&q=" + keyword + "&limit=9&offset=0&rating=PG&lang=en";

    // use AJAX to ping the Giphy API
    $.ajax({
        url: url,
        method: "GET"

        // once the request has returned us some data, do the following....
        }).then(function(response) {

            // create a new row to house all of the gifs (this makes sure that the cards we'll insert below don't take up a whole row each)
            let row = $("<div class='row'>");

            // overwrite the gifs container with the row (this prevents gifs from appending to previous searches)
            $("#gifs").html(row);

            // we want to pull 10 gifs, so we set up a for loop to take actions on each gif up to 10
            for (i=0; i < 10; i++) {

                // create a card to house the gif, with some spacing and an ID
                let card = $("<div class='card mr-4 mb-3' id='gif" + i + "'>");

                // append the card to the row we just created
                row.append(card);

                // create the img container for the gif, which ties into the bootstrap card functionality
                let cardImg = $("<img class='card-img-top'>");

                // give the img the following attributes:

                // the source for the image, which is a still
                cardImg.attr('src', response.data[i].images.fixed_width_still.url);

                // the still image link again for when we pause the gifs
                cardImg.attr('data-still', response.data[i].images.fixed_width_still.url);

                // the animated gif link for when we start a gif
                cardImg.attr('data-animate', response.data[i].images.fixed_width.url);

                // an attribute that lets us know if the gif is currently paused or unpaused
                cardImg.attr('data-state', 'still');

                // a class of gif so that we can listen for clicks
                cardImg.attr('class', 'gif');

                // alternate text for usability purposes
                cardImg.attr('alt', response.data[i].title);

                // append the card image to the card
                card.append(cardImg);

                // create the div that will hold the rest of the card content
                let cardBody = $("<div class='card-body'>");

                // append the cardBody to the card
                card.append(cardBody);

                // create the div that holds the card text
                let cardText = $("<div class='card-text'>");

                // add the gif's rating to the cardText
                cardText.text('Content rated: ' + response.data[i].rating);

                // append the cardText to the cardBody
                cardBody.append(cardText);
            }

            // listen for clicks on the gifs
            $(".gif").click(function() {

                // grab the data-state of the gif
                let state = $(this).attr("data-state");

                // if the state is currently still....
                if (state == "still") {

                    // grab the URL for the animated gif
                    let animatedGif = $(this).attr("data-animate");

                    // change the src of the gif to the animated version
                    $(this).attr("src", animatedGif);

                    // change the state of the gif to animate so that we know it's currently animated
                    $(this).attr("data-state", "animate");
                }
        
                // if the state is currently animated...
                if (state == "animate") {

                    // grab the URL for the still gif
                    let stillGif = $(this).attr("data-still");

                    // change the src of the gif to the still version
                    $(this).attr("src", stillGif);

                    // change the state of the gif to still so that we know it's currently not animated
                    $(this).attr("data-state", "still");
                }
            });
        });
    });
});