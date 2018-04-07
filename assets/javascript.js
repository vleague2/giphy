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
    // let keyword = this.value
    // let url = API url call + keyword
    // ajax call to api using URL and GET
    // then function

        // createCard function:
            // let card = $("<div class='card'>")
            // col.append(card)
            // let cardImg = $("<div class='card-img-top'>")
            // cardImg attr src of response.PATH.URL[i]
            // cardImg attr alt text
            // card.append(cardImg)
            // let cardBody = $("<div class='card-body'>"")
            // card.append(cardBody)
            // let cardText = $("<div class='card-text'>")
            // cardText.text('Content rated: ' + response.PATH.RATING[i])
            // cardBody.append(cardText)

        // let row1 = $("div class='row' id='row1'>")
        // $("#gifs").append(row1)
        // for loop i = 0 < 3           
            // let col = $("div class='col-md-4'>")
            // row1.append(col)
            // call createCard

        // let row2 = $("div class='row' id='row2'>")   
        // $("#gifs").append(row2) 
        // for loop i = 3 i < 6
            // let col = $("div class='col-md-4'>")
            // row2.append(col)
            // call createCard

        // let row3 = $("div class='row' id='row3'>")   
        // $("#gifs").append(row3) 
        // for loop i=6 i<9
            // let col = $("div class='col-md-4'>")
            // row3.append(col)
            // call createCard

});