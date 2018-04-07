// document onload
// $(document).ready(function() {

// const array of desserts: cheesecake, donuts, cake, cupcake, chocolate, ice cream, croissant, cannoli
const desserts = ["cheesecake", "donuts", "cake", "cupcake", "chocolate", "ice cream", "croissant", "cannoli"];

// SIDEBAR FUNCTIONALITY~~~~~~~~~~~~~~~
// function makeButtons:
function makeButtons() {
    // empty buttons div (so that buttons arent infinitely appending)
    $("#buttons").empty();
    // for i < desserts.length loop: 
    for (i=0; i < desserts.length; i++) {
        // run through array of desserts and create buttons (should be nice bootstrap and i want two per row. should also add dessert names as value attributes)
        let button = $("<button type='button' class='btn btn-light mr-3 mb-3'>");
        button.text(desserts[i]);
        button.val(desserts[i]);
        // append buttons to button div.
        $("#buttons").append(button);
    }
}

// call makeButtons
makeButtons();


// on click search button
$("#search").click(function() {
    // clear default event
    event.preventDefault();

    // let input = the user's search input
    // trim input
    let input = $("#searchTerm").val().trim();

    // if input.length > 2
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

// });