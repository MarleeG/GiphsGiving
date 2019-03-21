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
    var MY_KEY = config.MY_KEY;
    let topics = [`Drake`, `2 Chainz`, `Kendrick Lamar`, `Beyonce`, `Cardi B`];



    // Create a function that displays all the topics
    // This will display all the topics in the topics array
    function displayButtons(topicsArray) {
        topicsArray.forEach((topic) => {
            let button = $(`<button type="button" class="btn btn-dark topic_button">${topic}</button>`);
            $(`.topics_col`).append(button);
        });
    }



    displayButtons(topics);

    // Topic adder button
    $('#topic_adder_button').click((event) => {
        // prevents page from refreshing
        event.preventDefault();
        log(`adding topic...`);

        // assigns the value of the user input to userInput
        let userInput = $('#topic_adder_input').val();
        log(userInput);

        // Adds new topic to topics array
        topics.push(userInput);

        // removes all topic buttons displayed on the screen
        $('.topic_button').remove();

        // Displays all buttons in topics array
        displayButtons(topics);

        // Empties Value in input 
        $('#topic_adder_input').val('');
    });


    // $('.topic_button').click((event) => {
    //     

    // });

    
    // Topic buttons
    $(document).on('click', '.topic_button', (event) => {
        // Grabs value of the button topic clicked on
        let { innerHTML } = event.target;
        displayGiphs(innerHTML);
        log(innerHTML);
    })

    // This will display a random topic when the page initially loads
    // this returns a random topic 
    function displayRandomTopic(topicsArray) {
        let randomTopic = Math.floor(Math.random() * topicsArray.length);
        return topicsArray[randomTopic];
    }

    // log(`random topic: ${}`);


    displayGiphs(displayRandomTopic(topics));

    function displayGiphs(topicChosen) {
        $.ajax({
            url: `http://api.giphy.com/v1/gifs/search?q=${topicChosen}&api_key=${MY_KEY}&limit=10`,
            context: document.body
        }).done(function (giphs) {
            // $()
            // downsized is moving giph
            // original_still is the paused giph

            // first giph = giphs.data[0].images
            let list_of_giphs = giphs.data;

            list_of_giphs.forEach((giph, i) => {
                // log(giph);
                let image_still = giph.images.original_still.url;
                let image_animated = giph.images.downsized.url;

                let image = $(`<img class='giph'>`);
                image.attr('data-still', image_still);
                image.attr('id', giph.id);
                image.attr('data-animated', image_animated);
                image.attr('data-status', 'paused')
                image.attr('alt', giph.title);
                image.attr('src', image_still);
                $('.giphs').prepend(image);
            });
        });
    }

    $(document).on('click', 'img.giph', (event) => {
        log(event)
        let { id } = event.target;
        // log($(this).data('status'));

        let data_status = $(`#${id}`).attr('data-status');
        let animated_src = $(`#${id}`).attr('data-animated');
        let still_src = $(`#${id}`).attr('data-still');

        log(data_status);

        // if giph is paused then play it
        if (data_status === 'paused') {

            $(`#${id}`).attr('src', animated_src);
            $(`#${id}`).attr('data-status', 'play');


        } else if (data_status === 'play') {
            // pause giph
            $(`#${id}`).attr('src', still_src);
            $(`#${id}`).attr('data-status', 'paused');
        }


        // log(`Clicked Giph`)
    })

});