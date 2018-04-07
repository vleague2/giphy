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

    // make sure they've entered actual text by setting a min length
    if (input.length > 2) {
        //push input to array and run makeButtons
        desserts.push(input);
        makeButtons();
    }
})

    
   

// GIF FUNCTIONALITY~~~~~~~~~~~~~~
// on click buttons div
$(".btn").click(function() {

    // let keyword = this.value
    let keyword = $(this).val();
    // let url = API url call + keyword
    let url = "https://api.giphy.com/v1/gifs/search?api_key=9QKf3NFG5b4l6jRUWl3g3bcxd4f1z6wR&q=" + keyword + "&limit=9&offset=0&rating=PG&lang=en";
    // ajax call to api using URL and GET
    $.ajax({
        url: url,
        method: "GET"
      }).then(function(response) {
          console.log(keyword);
          console.log(url);
          console.log(response);

        let row = $("<div class='row'>");
        $("#gifs").html(row);
        for (i=0; i < 9; i++) {
            let card = $("<div class='card mr-4 mb-3' id='gif" + i + "'>");
            row.append(card);
            let cardImg = $("<img class='card-img-top'>");
            cardImg.attr('src', response.data[i].images.fixed_width_still.url);
            cardImg.attr('data-still', response.data[i].images.fixed_width_still.url);
            cardImg.attr('data-animate', response.data[i].images.fixed_width.url);
            cardImg.attr('data-state', 'still');
            cardImg.attr('class', 'gif');
            cardImg.attr('alt', response.data[i].title);
            card.append(cardImg);
            let cardBody = $("<div class='card-body'>");
            card.append(cardBody);
            let cardText = $("<div class='card-text'>");
            cardText.text('Content rated: ' + response.data[i].rating);
            cardBody.append(cardText);

        }

        $(".gif").click(function() {
            let state = $(this).attr("data-state");
            console.log(state);
            if (state == "still") {
                let animatedGif = $(this).attr("data-animate");
                $(this).attr("src", animatedGif);
                $(this).attr("data-state", "animate");
              }
        
              if (state == "animate") {
                let stillGif = $(this).attr("data-still");
                $(this).attr("src", stillGif);
                $(this).attr("data-state", "still");
              }
        });
        });
    });

    
});