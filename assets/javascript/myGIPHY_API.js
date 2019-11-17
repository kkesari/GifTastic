// Java Script - will be called within the myGIPHY_API_page.html 
// Initial array of GIFs related to nature
var topics = ["flowers"];


// displaynewGIFs function re-renders the HTML to display the appropriate content
function displaynewGIFs() {

    var newGIF = $(this).attr("data-name");
    var limitUpto=10; // to limit the number of gifs retrieved 

    // empty the div at the beginning
    $("#gifs-img").empty();
    // Constructing a queryURL using the newGIF name

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        newGIF + "&api_key=kJhL86uAk1p6aBYOajQH6RZmGZX0R6cb&limit="+limitUpto;

    // Creating an AJAX call for the specific GIF button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(queryURL);

        // console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item -- only 10 times
        for (var i = 0; i < results.length; i++) {

            // Creating a div to hold the movie
            var newGIFDiv = $("<div class='newGIF'>");

            // Storing the rating data
            var rating = results[i].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            newGIFDiv.append(pOne);

            // Storing the release year
            var title = results[i].title;

            // Creating an element to hold the title
            var pTwo = $("<p>").text("Title: " + title);

            // Displaying the Title
            newGIFDiv.append(pTwo);

            // Storing the source_tld
            var from_source = results[i].source_tld;

            // Creating an element to hold the plot
            var pThree = $("<p>").text("Source: " + from_source);

            // Appending the plot
            newGIFDiv.append(pThree);

            // Retrieving the URL for the image
            var imgURL = results[i].images.fixed_height.url;

            // Creating an element to hold the image
            var image = $("<img>");
            image.attr("src", imgURL);

            // Appending the image
            image.append($("<p>"));
            newGIFDiv.append(image);
            newGIFDiv.attr("data-gif", imgURL);

            // Putting the entire movie above the previous movies
            $("#gifs-img").prepend(newGIFDiv);
            console.log(" attr value = " + newGIFDiv.attr("data-gif"));
            console.log($(image).attr("src"));



        }
        // this event will check if you click on the gif, it will toggle between stop and playing
        $("img[src$='gif']").on("click", function () {
            var src = $(this).attr("src");
            var still = $(this).attr("data-state");
            if ($(this).hasClass('playing')) {
                //stop
                $(this).attr('src', src.replace(/\.gif/i, "_s.gif"));
                $(this).removeClass('playing');
                console.log('stop playing ?' + $(this).attr("src"));
            } else {
                //play
                $(this).addClass('playing');
                $(this).attr('src', src.replace(/\_s.gif/i, ".gif"));
                console.log('playing ?' + $(this).attr("src"));
            }


        });
    });

}


// Function for displaying newGIFs data
function renderButtons() {

    // Empty all buttons prior to adding new GIF buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of topics 
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each new GIF in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("newGIFbtn");
        // Adding a data-attribute with a value of the topics at index i
        a.attr("data-name", topics[i]);
        // Providing the button's text with a value of the topics at index i
        a.html("<b>" + topics[i] + "</b>");
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }
}

// This function handles events where one button is clicked
// this will build an array of all the topics with new inputs
$("#add-new-gif").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box, assigns to newGIF
    var newGIF = $("#gif-input").val().trim();
    // The GIF from the textbox is then added to our array
    topics.push(newGIF);

    // calling renderButtons which handles the processing of our topics array
    renderButtons();
    $("#gif-input").val(" ");


});


// Adding a click event listener to all elements with a class of "newGIFbtn"
$(document).on("click", ".newGIFbtn", displaynewGIFs);


// Calling the renderButtons function to display the intial buttons
renderButtons();
