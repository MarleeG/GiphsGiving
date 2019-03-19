// Before you can make any part of our site work, 
// you need to create an array of strings, each one related to a topic 
// that interests you. 
// Save it to a variable called `topics`.

// 3. When the user clicks on a button, the page should grab 10 static, 
// non-animated gif images from the GIPHY API and place them on the page.

// 4. When the user clicks one of the still GIPHY images, the gif 
// should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you 
// move on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds 
// it into your `topics` array. Then make a function call that takes each topic 
// in the array remakes the buttons on the page.

// Giphy Request Parameters
// q: string
// Search query term or phrase.
// GIPHY search will automatically 
// look for exact matches to queries + 
// AND match + OR match. Explicit AND + 
// OR boolean clauses in search queries 
// are not supported.

// limit: integer (int32)
// The maximum number of records to return.
// 25

// rating: string
// Filters results by specified rating.

const log = console.log;
$(function () {
    const MY_KEY = config.MY_KEY;
    let topics = [`Drake`, `2 Chainz`, `Kendrick Lamar`, `Beyonce`, `Cardi B`];



    // Create a function that displays all the topics
    // This will display all the topics in the topics array
    function displayButtons(topicsArray){
        topicsArray.forEach((topic) => {
            let button = $(`<button type="button" class="btn btn-dark topic_button">${topic}</button>`);
            $(`.topics_col`).append(button);
        })
        
    }

    displayButtons(topics);


    $.ajax({
        url: `http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${MY_KEY}&limit=10`,
        context: document.body
    }).done(function (giphs) {
        // $(this).addClass("done");
        // downsized is moving giph
        // original_still is the paused giph
        
        // first giph = giphs.data[0].images
        log(giphs.data);

    });



})